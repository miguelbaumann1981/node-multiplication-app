
// const fs = require('fs');
import * as fs from 'fs';
import { yarg } from './config/plugins/args.plugin';


const { b:base, l:limit, s:isShown } = yarg;
// const base: number = Number(yarg.b) ?? 5;
// const limit: number = Number(yarg.l);
// const isShown: boolean = Boolean(yarg.s);
const header: string = `=============\nTabla del ${base}\n=============\n`;
let outputMessage: string = '';

for (let i = 1; i <= limit; i++) {
    const operation =  base * i;
    outputMessage += `${base} x ${i} = ${operation}\n`
}
outputMessage = header + outputMessage;

if (isShown) {
    console.log(outputMessage);
}
console.log('File created');

const outputPath = `outputs`;
fs.mkdirSync(outputPath, {recursive: true});

fs.writeFileSync(`${outputPath}/myfile.txt`, outputMessage);


