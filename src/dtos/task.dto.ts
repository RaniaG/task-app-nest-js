import { TaskStates } from "src/models/task-states.enum";
import { IsString, IsEnum, IsInt } from 'class-validator';

export class TaskDto {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsEnum(TaskStates)
    currentState: TaskStates;
    @IsInt()
    userId: number;
}