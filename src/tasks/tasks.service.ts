import { Injectable } from '@nestjs/common';
import { Task } from '../models/task.model';
import { TaskStates } from 'src/models/task-states.enum';
import { TaskDto } from '../dtos/task.dto';
import { TaskListQueryDto } from 'src/dtos/task-list-query.dto';

@Injectable()
export class TasksService {
    tasks: Task[];
    constructor() {
        this.tasks = [];
    }
    getAll(listingQuery: TaskListQueryDto): Task[] {
        let result = this.tasks.filter(e => e.userId == listingQuery.userId);
        if (listingQuery.state != null) {
            result = result.filter(e => e.currentState == listingQuery.state);
        }
        return result;
    }

    createTask(task: TaskDto): Promise<Task> {
        return new Promise((res, reject) => {
            let dbTask = new Task();
            dbTask.id = this.tasks.length;
            Object.assign(dbTask, task);
            this.tasks.push(dbTask);
            setTimeout(function () {
                res(dbTask);
            }, 5000);
        });
    }
    deleteTask(id: number): void {
        let taskIndex = this.tasks.findIndex(e => e.id == id && e.currentState != TaskStates.deleted);
        if (taskIndex > 0) {
            let task = this.tasks[taskIndex];
            task.previousState = task.currentState;
            task.currentState = TaskStates.deleted;
        }
    }
    restoreTask(id: number): Task {
        let taskIndex = this.tasks.findIndex(e => e.id == id && e.currentState == TaskStates.deleted);
        if (taskIndex > 0) {
            let task = this.tasks[taskIndex];
            task.currentState = task.previousState;
            task.previousState = TaskStates.deleted;
            return task;
        }
        return null;
    }
    updateTask(id: number, task: TaskDto): Task {
        let dbTask = this.tasks.find(e => e.id == id && e.currentState != TaskStates.deleted);
        if (dbTask) {
            dbTask.name = task.name;
            dbTask.description = task.description;
            return dbTask;
        }
        return null;
    }
    changeState(id: number, newState: TaskStates): Task {
        let dbTask = this.tasks.find(e => e.id == id && e.currentState != TaskStates.deleted);
        if (dbTask && newState != TaskStates.deleted) {
            dbTask.previousState = dbTask.currentState;
            dbTask.currentState = newState;
            return dbTask;
        }
        return null;
    }
}
