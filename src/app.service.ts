// o service é uma classe mais genérica, onde podemos colocar os serviços da aplicação
// exemplo: um serviço de conexão com banco de dados, um serviço de repository, etc.

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
