import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './infra/app.controller';
import { PrismaService } from './infra/prisma.service';


//o module aclopa vários controllers e vários services
//ele é basicamente um ponto central para importar esses arquivos

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService],
})

// o App.module é o module principal da nossa aplicação
export class AppModule { }

//Injeção de dependência: o nest automaticamente passa uma instancia da classe
//App service com parâmetro. Para que isso possa acontecer a classe precisa ter um
// decorator chamado Injectable  
