import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './models/task.entity';
import { TaskController } from './controllers/task.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity])
  ],
  controllers: [TaskController], //Controllers setup endpoints, handle request/response logic
  providers: [TaskService] //Services handle business logic (i.e. interact with DB - data processing, data fetching, etc)
})
export class TasksModule {}
