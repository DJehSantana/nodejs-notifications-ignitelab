import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";


describe('Cancel notification', () => {
    test('Notificação habilitada para o cancelamento', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = makeNotification();
        await notificationsRepository.create(notification);

        // o execute chama o método create
        await cancelNotification.execute({
            notificationId: notification.id,
        });

        //o objeto recebido por parametro deve ser o mesmo do criado no array
        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    test('Notificação a ser cancelada não existe', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);


        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    })

});