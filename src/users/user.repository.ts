import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async createUser(userDto: CreateUserDto) {
    return this.model.create(userDto);
  }

  async findAllUser() {
    return this.model.find();
  }

  async findUser(idUser: string) {
    return this.model.findById(idUser);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.model.findByIdAndUpdate(id, updateUserDto);
  }
  async deleteUser(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
