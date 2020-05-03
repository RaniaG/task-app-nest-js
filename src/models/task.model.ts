import { TaskStates } from "src/models/task-states.enum";

export class Task {
    id: number;
    name: string;
    description: string;
    previousState: TaskStates;
    currentState: TaskStates;
    userId: number;
    createdAt: Date;
}