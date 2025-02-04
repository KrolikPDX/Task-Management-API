import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from, map } from 'rxjs'
import { TaskEntity } from '../models/task.entity';
import { TaskModel } from '../models/task.interface';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity> 
    ) {}

    //Return all tasks found in DB
    getAllTasks(): Observable<TaskModel[]> { 
        return from(this.taskRepository.find()) 
    }

    //Return specific task found in DB by title
    getTaskById(id: number): Observable<TaskModel | null> {
        return from(this.taskRepository.findOne({ where: { id } }));
    }

    //Save given task to the DB
    createTask(task: TaskModel): Observable<TaskModel> {
        return from(this.taskRepository.save(task)); //Convert returned value from promise to TaskModel object
    }

    updateTask(id: number, task: TaskModel): Observable<UpdateResult> { 
        return from(this.taskRepository.update(id, task));
    }

    deleteTask(id: number): Observable<DeleteResult> {
        return from(this.taskRepository.delete(id));
    }
}
