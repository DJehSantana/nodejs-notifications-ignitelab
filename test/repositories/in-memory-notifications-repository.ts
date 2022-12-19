import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";

export class InMemoryNotificationsRepository implements NotificationsRepository {
    public notifications: Notification[] = [];

    async create(notification: Notification) {
        this.notifications.push(notification);
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find(
            (item) => item.id == notificationId,
        );

        //caso não encontre a notificação com o id igual ao passado por parâmetro
        //retornará null
        if (!notification) {
            return null;
        }

        return notification;
    }
    async save(notification: Notification): Promise<void> {
        //retorna o index dentro do array em que se encontra a notificação que tem
        //o id igual ao id passado por parâmetro 
        const notificationIndex = this.notifications.findIndex(
            (item) => item.id == notification.id,
        );

        //se o retorno for maior ou igual a 0, vai substituir a notificação 
        //pela notificação atualizada
        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification;
        }
    }
};
