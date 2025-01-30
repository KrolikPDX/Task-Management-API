import { Controller, Get, Post, Body, NotFoundException, BadRequestException, Param } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../models/task.interface';
import { map, Observable } from 'rxjs';
import { get } from 'http';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post() //Creates new task and adds it to DB
    create(@Body() task: TaskModel): Observable<TaskModel> { //From the body of the request, create a task given the object
        if (!task.title) throw new BadRequestException('Title is a required field.');
        if (!task.description) throw new BadRequestException('Description is a required field.');
        return this.taskService.createTask(task)
    }

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
}
