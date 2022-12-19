import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

//recebe o id da notificação criada 
interface CancelNotificationRequest {
    notificationId: string;
}

//type - retorno vazio 
type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {

    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: CancelNotificationRequest,
    ): Promise<CancelNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        //verificando se retornou alguma notificação
        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.cancel();

        await this.notificationsRepository.save(notification);
    }
}