import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status, User } from './user.entity';
import { Repository } from 'typeorm';
import { Hash } from 'src/utils/hash';
import { SignUpDto } from '../AuthModule/dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const result = await this.userRepository.find();
    return result;
  }

  getUserByEmail(email: string, phone: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
        phone: phone
      },
    });
  }

  getUserByPhone(phone: string) {
    return this.userRepository.findOneBy({ phone });
  }

  async createUser(signUpDto: SignUpDto) {
    const foundUser = await this.getUserByEmail(signUpDto.email, signUpDto.phone);
    console.log('Check foundUser: ', foundUser)
    if (foundUser) {
      throw new ConflictException('Email or phone already in use');
    }

    const hashPassword = Hash.generateHash(signUpDto.password);
    const user = this.userRepository.create({
      fullName: signUpDto.fullName,
      email: signUpDto.email,
      avatar: signUpDto.avatar,
      password: hashPassword,
      status: Status.ACTIVE,
      phone: signUpDto.phone,
    });
    await this.userRepository.save(user);
    return user;
  }
}
