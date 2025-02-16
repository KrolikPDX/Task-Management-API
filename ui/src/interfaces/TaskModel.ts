interface TaskModel {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    handleRefreshTask: () => void;
}

export default TaskModel;