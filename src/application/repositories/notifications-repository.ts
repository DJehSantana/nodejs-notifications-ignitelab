import { Notification } from "../entities/notification";

export abstract class NotificationsRepository {
    //Vai criar a notificação, retorno da promisse vazio - void
    abstract create(notification: Notification): Promise<void>;
}