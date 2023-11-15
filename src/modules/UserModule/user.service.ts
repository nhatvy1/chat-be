import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status, User } from './user.entity';
import { Repository } from 'typeorm';
import { Hash } from 'src/utils/hash';
import { SignUpDto } from '../AuthModule/dto/sign-up.dto';
import { RoleService } from '../RoleModule/role.service';
import { RoleName } from '../RoleModule/role.entity';
import { SignInDto } from '../AuthModule/dto/sign-in.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async findAll() {
    const result = await this.userRepository.find();
    return result;
  }

  getUserByEmail(email: string, phone?: string) {
    return this.userRepository.findOne({
      where: [{ email: email }, { phone: phone }],
    });
  }

  getUserLogin(email: string) {
    return this.userRepository.findOne({
      select: { password: true },
      where: { email: email },
    });
  }

  async createUser(signUpDto: SignUpDto) {
    const foundUser = await this.getUserByEmail(
      signUpDto.email,
      signUpDto.phone,
    );
    if (foundUser) {
      throw new ConflictException('Email or phone already in use');
    }

    const hashPassword = Hash.generateHash(signUpDto.password);
    const findUserRole = await this.roleService.findRoleByName(RoleName.User);
    const user = this.userRepository.create({
      fullName: signUpDto.fullName,
      email: signUpDto.email,
      avatar: signUpDto.avatar,
      password: hashPassword,
      status: Status.ACTIVE,
      phone: signUpDto.phone,
      role: findUserRole,
    });
    await this.userRepository.save(user);
    return user;
  }

  login(signInDto: SignInDto): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where({ email: signInDto.email })
      .leftJoinAndSelect(`${this.userRepository.metadata.name}.role`, 'role')
      .getOne();
  }
}
