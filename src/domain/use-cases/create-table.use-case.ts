
export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}


export class CreateTable implements CreateTableUseCase {

    constructor(
        // Injection Dependencies
    ) {}

    execute({ base, limit = 10 }: CreateTableOptions) {
        let outputMessage: string = '';
        for (let i = 1; i <= limit; i++) {
            const operation =  base * i;
            outputMessage += `${base} x ${i} = ${operation}\n`
        }
        return outputMessage;
    }


}