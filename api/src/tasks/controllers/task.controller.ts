import { Controller, Get, Post, Body, NotFoundException, BadRequestException, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../models/task.interface';
import { map, Observable } from 'rxjs';
import { get } from 'http';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get() //Returns list of all tasks
    getAllTasks(): Observable<TaskModel[]> {
        return this.taskService.getAllTasks();
    }

    @Get(':id') //Returns information about specified task 
    getTaskByTitle(@Param('id') id: number): Observable<TaskModel | null> {
        return this.taskService.getTaskById(id).pipe(
            map((task) => {
                if (!task) {
                    throw new NotFoundException(`Task with ID '${id}' not found`);
                }
                return task; 
            }),
        );
    }

    @Post() //Creates new task and adds it to DB
    createTask(@Body() task: TaskModel): Observable<TaskModel | null> { //From the body of the request, create a task given the object
        if (!task.title) throw new BadRequestException('Title is a required field.');
        if (!task.description) throw new BadRequestException('Description is a required field.');
        if (!task.user_id) throw new BadRequestException('User_ID is a required field.');
        return this.taskService.createTask(task)
    }

    @Put(':id')
    updateTask(@Param('id') id: number, @Body() task: TaskModel) : Observable<UpdateResult> {
        return this.taskService.updateTask(id, task);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number): Observable<DeleteResult> {
        return this.taskService.deleteTask(id);
    }
}