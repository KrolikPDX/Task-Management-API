import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs'
import { TaskEntity } from '../models/task.entity';
import { TaskModel } from '../models/task.interface';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity> 
    ) {}

    createTask(task: TaskModel): Observable<TaskModel> {
        return from(this.taskRepository.save(task)); //Save given task to db, convert return value from promise to TaskModel object
    }

    getAllTasks(): Observable<TaskModel[]> {
        return from(this.taskRepository.find())
    }

    getTaskByTitle(title: string) {
        
    }
}
