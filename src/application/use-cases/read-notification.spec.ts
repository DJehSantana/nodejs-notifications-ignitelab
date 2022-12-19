import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";


describe('Read notification', () => {
    test('Notificação habilitada para marcar leitura', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        const notification = makeNotification();
        await notificationsRepository.create(notification);

        // o execute chama o método create
        await readNotification.execute({
            notificationId: notification.id,
        });

        //o objeto recebido por parametro deve ser o mesmo do criado no array
        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
    });

    test('Notificação a ser lida não existe', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);


        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    })

});