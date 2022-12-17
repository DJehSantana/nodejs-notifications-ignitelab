import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateNotificationBody {

    //validações utilizando decorator do nest
    //padronizam status e respostas de erros    
    @IsNotEmpty()
    @IsUUID()
    recipientId: string;


    @IsNotEmpty()
    @Length(5, 240) // valor1: tamanho min, valor2: tamanho max
    content: string;

    @IsNotEmpty()
    category: string;
}