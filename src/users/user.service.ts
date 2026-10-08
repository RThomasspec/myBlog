import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(name: string, email: string, password: string) {
    return this.userRepository.createUser(name, email, password);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findAll() {
    return this.userRepository.findAllUser();
  }

  async findOne(id: string) {
    return this.userRepository.findUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
