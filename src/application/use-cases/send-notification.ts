import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

//recebe um objeto 
interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

//retorna um objeto
interface SendNotificationResponse {
    notification: Notification;
}

@Injectable()
export class SendNotification {

    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
        const { recipientId, content, category } = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category
        });

        //Persistir a notificação no Banco de dados
        await this.notificationsRepository.create(notification);

        return {
            notification,
        }
    }
}