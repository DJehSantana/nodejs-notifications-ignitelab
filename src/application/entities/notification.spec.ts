import { Content } from "./content";
import { Notification } from "./notification";

describe('Notification', () => {
    test('A notificação é válida', () => {
        const notification = new Notification({
            content: new Content('Nova solicitação de amizade'),
            category: 'social',
            recipientId: '123455',
        });

        expect(notification).toBeTruthy();
    });
});