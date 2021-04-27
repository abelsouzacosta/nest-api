import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    const users = this.repository.find();

    return users;
  }

  public async showUser(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  public async create(data: CreateUserInput): Promise<User> {
    const user = this.repository.create(data);

    const userSaved = await this.repository.save(user);

    if (!userSaved)
      throw new InternalServerErrorException('User nao pode ser salvo');

    return userSaved;
  }

  public async update(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.repository.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    await this.repository.update(user, { ...data });

    const userUpdated = this.repository.create({ ...user, ...data });

    return userUpdated;
  }
}
