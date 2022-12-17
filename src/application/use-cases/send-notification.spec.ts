import { Notification } from "../entities/notification";
import { SendNotification } from "./send-notification"

const notifications: Notification[] = [];

const notificationsRepository = {
    async create(notification: Notification) {
        notifications.push(notification);
    }
};

describe('Send notification', () => {
    test('Notificação habilitada para o envio', async () => {
        const sendNotification = new SendNotification(notificationsRepository);

        // o execute chama o método create
        await sendNotification.execute({
            recipientId: 'example-recipient-id',
            content: 'Uma nova notificação',
            category: 'social'
        });

        console.log(notifications);

        //é esperado que o array tenha pelo menos um item
        expect(notifications).toHaveLength(1);
    });
});