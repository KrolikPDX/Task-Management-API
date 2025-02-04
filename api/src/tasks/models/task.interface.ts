export interface TaskModel {
    id?: number;
    user_id?: number;
    completed?: boolean;
    title: string;
    description: string;
}