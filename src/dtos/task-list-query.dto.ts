import { TaskStates } from "src/models/task-states.enum";
import { IsInt, IsEnum } from "class-validator";

export class TaskListQueryDto {
    @IsInt()
    userId: number;
    @IsEnum(TaskStates)
    state: TaskStates;
}