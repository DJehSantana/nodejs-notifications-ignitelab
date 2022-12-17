import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';


//o module aclopa vários controllers e vários services
//ele é basicamente um ponto central para importar esses arquivos

@Module({
  imports: [HttpModule, DatabaseModule],
})

// o App.module é o module principal da nossa aplicação
export class AppModule { }

//Injeção de dependência: o nest automaticamente passa uma instancia da classe
//App service com parâmetro. Para que isso possa acontecer a classe precisa ter um
// decorator chamado Injectable  
