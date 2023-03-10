import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe('Count recipients notifications', () => {
    test('Contagem de notificações habilitada', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1' })
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1' })
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-2' })
        );

        // compara o recipientId
        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        //o retorno do tamanho do array deve ser 2 
        //pois existem 2 notificações com o mesmo recipientId
        expect(count).toEqual(2);
    });

});