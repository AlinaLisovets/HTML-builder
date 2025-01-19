import { readdir } from 'fs/promises';
import path from 'node:path';
import { stat } from 'node:fs';
const dirPath = `03-files-in-folder/secret-folder`;

try {
  const files = await readdir(dirPath, {withFileTypes: true});
  for (const file of files) {
    if (file.isFile()) {
        stat(path.join(dirPath, file.name), (err, stats) => {
            console.log(file.name + ' - ' + path.extname(file.name).replace('.', '') + ' - ' + stats.size + 'kb');
        })
    }
  }
} catch (err) {
  console.error(err);
}
