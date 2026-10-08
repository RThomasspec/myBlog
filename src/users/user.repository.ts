import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async createUser(name: string, email: string, hashedPassword: string) {
    return this.model.create({ name, email, hashedPassword });
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email: email });
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
