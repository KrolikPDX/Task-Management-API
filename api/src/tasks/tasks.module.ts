import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './models/task.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [TaskController], //Controllers setup endpoints, handle request/response logic
  providers: [TaskService] //Services handle business logic (i.e. interact with DB - data processing, data fetching, etc)
})
export class TasksModule {}
