import { Notification } from "@application/entities/notification";

export class PrismaNotificationMapper {
    // método declarado como static para que não seja necessário realizar 
    //uma instancia da classe para utilizá-lo
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            content: notification.content.value,
            category: notification.category,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
        }
    }
}