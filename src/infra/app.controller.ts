//o controller no nest vai definir as rotas da aplicação

import { Body, Controller, Get, Post } from '@nestjs/common';
//import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
//gerador de Id único universal do node
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';

// o @ indica que o método ou classe tem um comportamento decorator que está vindo da
//importação do Nest
@Controller('notifications')
export class AppController {
  //recebe as dependências com parâmetro através do construtor.
  //quem for criar uma instancia da classe passará a dependência no momento da instância.
  constructor(private readonly prisma: PrismaService) { }

  //Ao passar uma String como parâmetro, o método a entenderá como rota
  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    //pegando parâmetros do corpo da requisição
    const { recipientId, content, category } = body;

    // criando a tabela no bd com os dados coletados e um Id gerado automaticamente
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}

//o Nest trabalha com o principio de inversão de dependências.
//o App controller está recebendo a funcionalidade como parâmetro e a instanciado 
