import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'fs';
import { join, extname, parse } from 'path';

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.tiff', '.bmp', '.gif'];

interface Options {
  inputDir: string;
  outputDir: string;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

async function compressImages(options: Options) {
  const {
    inputDir,
    outputDir,
    quality = 80,
    maxWidth = 1920,
    maxHeight = 1920,
  } = options;

  if (!existsSync(inputDir)) {
    console.error(`Erro: Diretório de entrada não encontrado: ${inputDir}`);
    process.exit(1);
  }

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
    console.log(`Diretório de saída criado: ${outputDir}`);
  }

  const files = readdirSync(inputDir).filter(file =>
    SUPPORTED_FORMATS.includes(extname(file).toLowerCase())
  );

  if (files.length === 0) {
    console.log('Nenhuma imagem encontrada para compressão.');
    return;
  }

  console.log(`\n📁 Comprimindo ${files.length} imagem(ns)...`);
  console.log(`📐 Máx: ${maxWidth}x${maxHeight}px`);
  console.log(`⚙️  Qualidade WebP: ${quality}%\n`);

  let totalOriginalSize = 0;
  let totalCompressedSize = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = join(inputDir, file);
    const fileName = parse(file).name;
    const outputPath = join(outputDir, `${fileName}.webp`);

    const metadata = await sharp(inputPath).metadata();
    const originalSize = metadata.size || 0;
    totalOriginalSize += originalSize;

    try {
      await sharp(inputPath)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .withMetadata({ density: 72 })
        .webp({ quality })
        .toFile(outputPath);

      const compressedSize = existsSync(outputPath)
        ? (await sharp(outputPath).metadata()).size || 0
        : 0;
      totalCompressedSize += compressedSize;

      const reduction = originalSize > 0
        ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
        : '0.0';

      const originalKB = (originalSize / 1024).toFixed(1);
      const compressedKB = (compressedSize / 1024).toFixed(1);

      console.log(
        `[${i + 1}/${files.length}] ${fileName}:\n` +
        `   📥 Original: ${originalKB}KB\n` +
        `   📤 WebP:     ${compressedKB}KB\n` +
        `   📉 Redução:  ${reduction}%\n`
      );
    } catch (error) {
      console.error(`❌ Erro ao comprimir ${file}:`, error);
    }
  }

  const totalReduction = totalOriginalSize > 0
    ? ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1)
    : '0.0';

  console.log('━'.repeat(40));
  console.log(`📊 RESUMO FINAL`);
  console.log(`📦 Total original:  ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📦 Total comprimido: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📉 Redução total:   ${totalReduction}%`);
  console.log(`✅ DPI configurado: 72dpi`);
  console.log(`✅ Formato: WebP`);
  console.log('━'.repeat(40));
}

const inputDir = process.argv[2] || join(process.cwd(), 'public', 'assets', 'img', 'raw');
const outputDir = process.argv[3] || join(process.cwd(), 'public', 'assets', 'img', 'portfolio');
const quality = parseInt(process.argv[4] || '80', 10);

compressImages({ inputDir, outputDir, quality }).catch(console.error);
