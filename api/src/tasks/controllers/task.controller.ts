import { Controller, Get, Post, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../models/task.interface';
import { Observable } from 'rxjs';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {} //TaskService = backend of creating a task

    @Post() 
    create(@Body() task: TaskModel): Observable<TaskModel> { //From the body of the request, create a task given the object
        if (!task.title) throw new BadRequestException('Title is a required field.');
        if (!task.description) throw new BadRequestException('Description is a required field.');
        return this.taskService.createTask(task)
    }

    @Get("all")
    get(): Observable<TaskModel[]> {
        return this.taskService.getAllTasks();
    }
}
