import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create({
    Name,
    Email,
    LastName,
    Password,
  }: CreateUserDto): Promise<User> {
    const user = new User(
      Name,
      LastName,
      Email,
      await this.hashPassword(Password),
    );
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ Email: email });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ Id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.save({ Id: id, ...updateUserDto });
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 11);
  }

  validatePassword(insertedPassword: string, userPassword: string): boolean {
    return bcrypt.compareSync(insertedPassword, userPassword);
  }
}
