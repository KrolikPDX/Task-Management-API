import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from, map, mergeMap, of, throwError } from 'rxjs'
import { TaskEntity } from '../models/task.entity';
import { TaskModel } from '../models/task.interface';
import { UserEntity } from 'src/user/models/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
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
    createTask(task: TaskModel): Observable<TaskModel | null>{
        return from(this.userRepository.findOne({ where: { id: task.user_id } })).pipe(
            mergeMap((user) => {
              if (!user) {
                return throwError(() => new NotFoundException(`User with ID ${task.user_id} not found`));
              }
              // User exists, proceed to save the task
              return from(this.taskRepository.save(task));
            })
        );
    }

    updateTask(id: number, task: TaskModel): Observable<UpdateResult> { 
        return from(this.taskRepository.update(id, task));
    }

    deleteTask(id: number): Observable<DeleteResult> {
        return from(this.taskRepository.delete(id));
    }
}
