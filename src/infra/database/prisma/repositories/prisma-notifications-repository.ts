import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {

    constructor(private prisma: PrismaService) {

    }
    async create(notification: Notification): Promise<void> {
        //vai receber os dados formatados da classe mapper para salvar no Prisma
        const raw = PrismaNotificationMapper.toPrisma(notification);
        await this.prisma.notification.create({ data: raw });
    }

    //a notificação da camada de banco de dados não é a mesma da de casos de uso
    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        });

        if (!notification) {
            return null;
        }

        return PrismaNotificationMapper.toDomain(notification);
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId,
            }
        });

        //retorna a lista de notificações formatada para o domínio externo da aplicação 
        return notifications.map(PrismaNotificationMapper.toDomain);
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prisma.notification.update({
            where: {
                id: raw.id
            },
            data: raw
        });


    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId
            }
        });

        return count;
    }



}