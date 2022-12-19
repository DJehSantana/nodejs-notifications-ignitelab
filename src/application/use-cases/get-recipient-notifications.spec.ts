import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe('Get recipients notifications', () => {
    test('Listagem de notificações habilitada', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository);

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
        const { notifications } = await getRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        //o retorno do tamanho do array deve ser 2 
        //pois existem 2 notificações com o mesmo recipientId
        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ recipientId: 'recipient-1' }),
                expect.objectContaining({ recipientId: 'recipient-1' })
            ]))
    });

});