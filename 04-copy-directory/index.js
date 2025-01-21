const fs = require('node:fs');
const path = require('node:path');

async function copyDir(source, destination) {
    
  try {
    await fs.promises.mkdir(destination, { recursive: true });

    const items = await fs.promises.readdir(source);

    for (const item of items) {
      const sourcePath = path.join(source, item);
      const destinationPath = path.join(destination, item);

      const stat = await fs.promises.stat(sourcePath);

      if (stat.isDirectory()) {
        await copyDir(sourcePath, destinationPath);
      } else {
        await fs.promises.copyFile(sourcePath, destinationPath);
      }
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

async function copyFile() {
  const sourceDir = path.join(__dirname, 'files');
  const destinationDir = path.join(__dirname, 'files-copy');

  await copyDir(sourceDir, destinationDir);
  console.log('Копирование прошло успешно!');
}

copyFile();
