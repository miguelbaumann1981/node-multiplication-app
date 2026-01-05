import { SaveFile } from './save-file.use-case';
import * as fs from 'fs';

describe ('SaveFileUseCase', () => {

    const saveFile = new SaveFile();

    const customOptions = { 
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name' 
    };
    const customnFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;


    afterEach(() => {
        // `force: true` prevents ENOENT when the folder doesn't exist yet.
        // It's also more stable on Windows when files are created/removed quickly during watch mode.
        fs.rmSync('outputs', { recursive: true, force: true });
        fs.rmSync('custom-outputs', { recursive: true, force: true });
    });

    test('should save file with default values', () => {
        const filePath = 'outputs/table.txt';
        const options = { fileContent: 'test content' };
        const result = saveFile.execute(options);
        
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        
        expect(result).toBeTruthy();
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });


    test('should save file with custom values', () => {
        const result = saveFile.execute(customOptions);
        
        const checkFile = fs.existsSync(customOptions.fileDestination);
        const fileContent = fs.readFileSync(customnFilePath, { encoding: 'utf8' });
        
        expect(result).toBeTruthy();
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);
    });


    test.skip('should return false if directory could not be created', () => {
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message') }
        );
        const result = saveFile.execute({fileContent: 'hola'});    
        
        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    });

    test.skip('should return false if file could not be created', () => {
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );
        const result = saveFile.execute({fileContent: 'hola'});    
        
        expect(result).toBe(false);
        writeFileSpy.mockRestore();
    });

});