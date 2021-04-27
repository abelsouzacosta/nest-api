import { InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
// determina quais campos
// podem ser atualizados no processo
// de atualizacao de um user
@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
