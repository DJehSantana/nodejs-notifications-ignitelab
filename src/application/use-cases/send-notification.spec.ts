import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { SendNotification } from "./send-notification"

describe('Send notification', () => {
    test('Notificação habilitada para o envio', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const sendNotification = new SendNotification(notificationsRepository);

        // o execute chama o método create
        const { notification } = await sendNotification.execute({
            recipientId: 'example-recipient-id',
            content: 'Uma nova notificação',
            category: 'social'
        });

        //é esperado que o array tenha pelo menos um item
        expect(notificationsRepository.notifications).toHaveLength(1);
        //o objeto recebido por parametro deve ser o mesmo do criado no array
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    });
});