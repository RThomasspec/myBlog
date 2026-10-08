import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/article.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  // Mettre tout les Modules déclarer dans l'app ici.
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://mongo:27017/myapp'),
    ArticlesModule,
    UserModule,
    AuthModule,
    RefreshTokenModule,
  ],
})
export class AppModule {}
