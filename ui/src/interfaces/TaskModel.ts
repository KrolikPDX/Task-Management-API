interface TaskModel {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    onCheckboxChange: (taskId: number, completed: boolean) => void;
    onTitleSave: (taskId: number, newTitle: string) => void;
    onDescriptionSave: (taskId: number, newDescription: string) => void;
    onDeleteClick: (taskId: number) => void;
}

export default TaskModel;