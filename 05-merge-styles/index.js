import fs from 'fs';
import path from 'path';
import { readdir } from 'fs/promises';

const stylesPath = '05-merge-styles/styles';
const outputPath = path.join('05-merge-styles/project-dist', 'bundle.css');

    try {
        const outputStream = fs.createWriteStream(outputPath);
        const files = await readdir(stylesPath, { withFileTypes: true });
        
        for (const file of files) {
            if (file.isFile() && path.extname(file.name) === '.css') {
                const inputPath = path.join(stylesPath, file.name);
                const inputStream = fs.createReadStream(inputPath, 'utf8');
    
                inputStream.pipe(outputStream, { end: false }); 
                
                inputStream.on('end', () => {
                    outputStream.write('\n');
                });
            }
        }
        
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
