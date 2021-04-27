import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  public async index(): Promise<User[]> {
    const users = this.userService.findAll();

    return users;
  }

  @Mutation(() => User)
  public async create(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.create(data);

    return user;
  }

  @Query(() => User)
  public async show(@Args('id') id: string): Promise<User> {
    const user = await this.userService.showUser(id);

    return user;
  }
}
