import { Controller, Post, Get, Query, Body, Put, Param, HttpException, HttpStatus, UseFilters, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../models/task.model';
import { TaskDto } from '../dtos/task.dto';
import { HttpExceptionFilter } from 'src/shared/exception.filter';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { TaskListQueryDto } from 'src/dtos/task-list-query.dto';
import { AuthGuard } from '@nestjs/passport';
// import { ParseIntPipe } from 'src/shared/parse-Int.pipe';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {
    }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body(new ValidationPipe()) task: TaskDto): Promise<Task> {
        return this.taskService.createTask(task);
    }
    @Get()
    getAll(@Query() listingQuery: TaskListQueryDto): Task[] {
        return this.taskService.getAll(listingQuery);
    }
    @Put(":id")
    @UseFilters(HttpExceptionFilter)
    update(@Param('id', new ParseIntPipe()) id: number, @Body(new ValidationPipe()) task: TaskDto) {
        let result = this.taskService.updateTask(id, task);
        if (!result)
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        return result;
    }
}
