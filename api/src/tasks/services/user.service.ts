import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from, map, mergeMap, throwError } from 'rxjs'
import { UserEntity } from '../models/user.entity';
import { UserModel } from '../models/user.interface';
import { TaskEntity } from '../models/task.entity';
import { TaskModel } from '../models/task.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity> 
    ) {}

    //Return all tasks found in DB
    getAllUsers(): Observable<UserModel[]> { 
        return from(this.userRepository.find());
    }
    
    addUser(user: UserModel): Observable<UserModel> {
        return from(this.userRepository.findOne({ where: { username: user.username } })).pipe(
            mergeMap((foundUser) => {
              if (foundUser) {
                return throwError(() => new ConflictException(`User '${user.username}' already exists`));
              }
              //User does not exist, proceed to save the user
              return from(this.userRepository.save(user));
            }),
        );
    }

    getUserById(id: number): Observable<UserModel | null> {
        return from(this.userRepository.findOne({ where: { id } }));
    }

    getTasksForUser(id: number): Observable<TaskModel[] | null> {
        return from(this.taskRepository.find({where: { user_id: id }}))
    }
}
