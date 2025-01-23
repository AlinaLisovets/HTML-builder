import path from 'node:path';
import fs from 'node:fs';

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
  const sourceDir = `04-copy-directory/files`;
  const destinationDir = `04-copy-directory/files-copy`;

  await copyDir(sourceDir, destinationDir);
  console.log('Копирование прошло успешно!');
}

copyFile();
