import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './models/task.entity';
import { TaskController } from './controllers/task.controller';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [TaskController], //Controllers setup endpoints, handle request/response logic
  providers: [TaskService] //Services handle business logic (i.e. interact with DB - data processing, data fetching, etc)
})
export class TasksModule {}
