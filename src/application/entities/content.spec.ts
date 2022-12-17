import { Content } from "./content";

describe('Notification content', () => {
    test('o conteúdo da notificação é válido', () => {
        const content = new Content('Você recebeu uma nova notificação de amizade');

        //resultado esperado que a propriedade 'content' tenha um valor válido
        expect(content).toBeTruthy();
    });

    test('o conteúdo não deve ter menos de 5 caracteres', () => {
        expect(() => new Content('aaaa')).toThrow();
    });

    test('o conteúdo não deve ter mais de 240 caracteres', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
});

