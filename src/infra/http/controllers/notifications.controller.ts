//o controller no nest vai definir as rotas da aplicação

import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';

// o @ indica que o método ou classe tem um comportamento decorator que está vindo da
//importação do Nest
@Controller('notifications')
export class NotificationsController {

  constructor(private sendNotification: SendNotification) {

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


    return { notification };

  }
}

//o Nest trabalha com o principio de inversão de dependências.
//o  notification-controller está recebendo a funcionalidade como parâmetro e a instanciado 
