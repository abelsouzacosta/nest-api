import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// determina as informações que serão recebidas
// no cadastro de uma instância de usuário no banco
// de dados da aplicacao
@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'O campo name nao pode estar vazio' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo email nao pode estar vazio' })
  email: string;
}
