//o controller no nest vai definir as rotas da aplicação

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

// o @ indica que o método ou classe tem um comportamento decorator que está vindo da
//importação do Nest
@Controller('notifications')
export class NotificationsController {

  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications
  ) { }

  @Patch('/:id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    });
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count }
  }

  @Get('/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    });
  }


  @Post()
  async create(@Body() body: CreateNotificationBody) {
    //pegando parâmetros do corpo da requisição
    const { recipientId, content, category } = body;

    //chamando o caso de uso que acionará o repository para a persistência dos dados
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });


    return {
      notification: NotificationViewModel.toHTTP(notification)
    };

  }
}

//o Nest trabalha com o principio de inversão de dependências.
//o  notification-controller está recebendo a funcionalidade como parâmetro e a instanciado 
