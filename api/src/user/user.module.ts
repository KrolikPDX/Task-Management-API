import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { TaskEntity } from 'src/tasks/models/task.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([TaskEntity])
  ],
  controllers: [UserController], //Controllers setup endpoints, handle request/response logic
  providers: [UserService] //Services handle business logic (i.e. interact with DB - data processing, data fetching, etc)
})
export class UserModule {}
