import { Notification } from "../entities/notification";

export abstract class NotificationsRepository {
    //Vai criar a notificação, retorno da promisse vazio - void
    abstract create(notification: Notification): Promise<void>;
    //Buscar notificação por Id
    abstract findById(notificationId: string): Promise<Notification | null>;
    //atualizando notificação
    abstract save(notification: Notification): Promise<void>;
    //contagem de notificações por recipientId
    abstract countManyByRecipientId(recipientId: string): Promise<number>;
}