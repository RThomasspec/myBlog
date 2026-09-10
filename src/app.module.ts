import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/article.module';
import { ArticleController } from './articles/article.controller';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { UserRepository } from './users/user.repository';
import { ArticleService } from './articles/article.service';
import { ArticleRepository } from './articles/article.repository';
@Module({
  // Mettre tout les Modules déclarer dans l'app ici.
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/myapp'),
    ArticlesModule,
    UserModule,
  ],
})
export class AppModule {}
