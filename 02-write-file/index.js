const fs = require('node:fs');
const readline = require('node:readline');
const outputStream = fs.createWriteStream('02-write-file/output.txt', { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Здравствуйте! Введите текст: ');

rl.on('line', (input) => {
  if (input === '.exit') {
    console.log('Окей. До свидания!');
    rl.close();
    process.exit();
  } else {
    outputStream.write(input + '\n');
  }
});

process.on('SIGINT', () => {
  console.log('\nОкей. До свидания!');
  rl.close();
  process.exit();
});
