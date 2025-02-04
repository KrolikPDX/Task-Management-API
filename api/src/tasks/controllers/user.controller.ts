import { Controller, Get, Post, Body, NotFoundException, BadRequestException, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../models/task.interface';
import { map, Observable } from 'rxjs';
import { get } from 'http';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserModel } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get() //Returns list of all tasks
    getAllusers(): Observable<UserModel[]> {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param('id') id: number):Observable<UserModel | null> {
        return this.userService.getUserById(id).pipe(
            map((task) => {
                if (!task) {
                    throw new NotFoundException(`User with ID '${id}' not found`);
                }
                return task; 
            }),
        );    
    }

    @Get(':id/tasks')
    getUserTasks(@Param('id') id: number): Observable<TaskModel[] | null> {
        return this.userService.getTasksForUser(id).pipe(
            map((task) => {
                if (!task) {
                    throw new NotFoundException(`User with ID '${id}' not found`);
                }
                return task; 
            }),
        ); 
    }

    

    @Post() //Creates user and adds it to DB
    createUser(@Body() user: UserModel): Observable<UserModel> { //From the body of the request, create a task given the object
        if (!user.username) throw new BadRequestException('User is a required field.');
        return this.userService.addUser(user);
    }
    /*

    @Put(':id')
    updateTask(@Param('id') id: number, @Body() task: TaskModel) : Observable<UpdateResult> {
        return this.taskService.updateTask(id, task);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number): Observable<DeleteResult> {
        return this.taskService.deleteTask(id);
    } */
}