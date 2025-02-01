interface TaskModel {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    onCheckboxChange: (taskId: number, completed: boolean) => void;
}

export default TaskModel;