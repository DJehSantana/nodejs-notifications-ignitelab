import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

//recebe o id da notificação lida 
interface UnreadNotificationRequest {
    notificationId: string;
}

//type - retorno vazio 
type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {

    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: UnreadNotificationRequest,
    ): Promise<UnreadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        //verificando se retornou alguma notificação
        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.unread();

        await this.notificationsRepository.save(notification);
    }
}