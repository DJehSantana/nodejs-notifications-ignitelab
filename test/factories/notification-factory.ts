import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/notification";

//Partial - Permite que todas as propriedades do objeto sejam opcionais ou undefined
type Override = Partial<NotificationProps>

//Podemos receber qualquer propriedade da notificação por parâmetro, ou nenhuma propriedade
export function makeNotification(override: Override = {}) {
    return new Notification({
        content: new Content('Nova solicitação de amizade!'),
        category: 'social',
        recipientId: 'recipient-1',
        ...override,
    });
}