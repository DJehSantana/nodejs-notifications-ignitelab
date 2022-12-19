import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";



describe('Unread notification', () => {
    test('Notificação habilitada para desmarcar leitura', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        const notification = makeNotification({
            readAt: new Date()
        });
        await notificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id,
        });

        //a propriedade readAt deve estar vazia
        expect(notificationsRepository.notifications[0].readAt).toBe(null);
    });

    test('Notificação a desmarcar leitura não existe', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);


        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    })

});