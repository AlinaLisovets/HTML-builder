import fs from 'node:fs';
import readline from 'node:readline';

const outputStream = fs.createWriteStream('02-write-file/output.txt', { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Здравствуйте! Введите текст. Для выхода нажмите ctrl + c или введите exit:  ');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Окей. До свидания!');
    rl.close();
  } else {
    outputStream.write(input + '\n');
  }
});

rl.on('SIGINT', () => {
  console.log('\nОкей. До свидания!');
  rl.close();
  process.exit();
});
