export class Content {
    private readonly content: string;

    get value(): string {
        return this.content;
    }

    private validateContentLength(content: string): boolean {
        return content.length >= 5 && content.length <= 240;
    }

    constructor(content: string) {
        //recebe o retorno da função de validação do conteúdo
        const isContentLengthValid = this.validateContentLength(content);

        //caso retorno da função seja falso, vazio ou indefinido dispara um erro
        if (!isContentLengthValid) {
            throw new Error('Content length error.');
        }

        this.content = content;
    }
}