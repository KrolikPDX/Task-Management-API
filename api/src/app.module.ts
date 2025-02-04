import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './tasks/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), //Allows env vars from .env to be accessible as process.env
    TypeOrmModule.forRoot({ //TypeOrm Module enables connection with DBs and entity management
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT), 
      username: process.env.POSTGRES_USER,
      password: <string>process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,

      //May cause loss of data in prod, look into this
      autoLoadEntities: true,
      synchronize: true 
    }), 
    TasksModule,
    UserModule
  ],
  controllers: [AppController], //Controllers handles logic between requests/responses
  providers: [AppService], 
})
export class AppModule {}
