
const fs = require('fs')

// async function createDocument() {
//     let fileHandle;
//     try {
//         fileHandle = await fs.open('myfile.txt', 'w');
//         await fileHandle.write(header);
//         for (let i = 1; i < 10; i++) {
//             const operation =  5 * i;
//             const result = (`5 x ${i} = ${operation}\n`).toString()
//             await fileHandle.write(result);
//         }
//     } catch(error) {
//         console.error('Error writing files:', error);
//     }
// }
//  createDocument();


const header: string = '=============\nTabla del 5\n=============\n';
let outputMessage: string = '';
for (let i = 1; i < 10; i++) {
    const operation =  5 * i;
    outputMessage += `5 x ${i} = ${operation}\n`
}
outputMessage = header + outputMessage;

const outputPath = `outputs`;
fs.mkdirSync(outputPath, {recursive: true});

fs.writeFileSync(`${outputPath}/myfile.txt`, outputMessage);


