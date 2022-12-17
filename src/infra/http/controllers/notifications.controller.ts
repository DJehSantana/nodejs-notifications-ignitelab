//o controller no nest vai definir as rotas da aplicação

import { Body, Controller, Post } from '@nestjs/common';

//gerador de Id único universal do node
//import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from '../dtos/create-notification-body';

// o @ indica que o método ou classe tem um comportamento decorator que está vindo da
//importação do Nest
@Controller('notifications')
export class NotificationsController {

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    //pegando parâmetros do corpo da requisição
    const { recipientId, content, category } = body;

    // criando a tabela no bd com os dados coletados e um Id gerado automaticamente
    // await this.prisma.notification.create({
    //data: {
    // id: randomUUID(),
    // content,
    // category,
    //recipientId,
    // },
    //});
  }
}

//o Nest trabalha com o principio de inversão de dependências.
//o App controller está recebendo a funcionalidade como parâmetro e a instanciado 
