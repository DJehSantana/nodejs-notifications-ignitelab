import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

//recebe o id da notificação lida 
interface ReadNotificationRequest {
    notificationId: string;
}

//type - retorno vazio 
type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {

    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: ReadNotificationRequest,
    ): Promise<ReadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        //verificando se retornou alguma notificação
        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationsRepository.save(notification);
    }
}