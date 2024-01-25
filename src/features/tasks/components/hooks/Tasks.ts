import { useRecoilState } from "recoil";
import { tasksState } from "../../TaskAtoms";
import type { Task } from "../../../../types";
import { TASK_PROGRESS_ID } from "../../../../constants/app";

interface useTaskActionType {
  completeTask: (taskID : number) => void
  moveTaskCard: (taskID : number, directionNumber : 1 | -1) => void
}

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  const completeTask = (taskID : number): void => {
    const updateTasks: Task[] = tasks.map ((task) => 
      task.id === taskID
        ? {...task, progressOrder: TASK_PROGRESS_ID.COMPLETED} : task,
      )
      setTasks(updateTasks)
  }

  const  moveTaskCard = (taskID : number, directionNumber : 1 | -1): void => {
    const taskIndex = tasks.findIndex((task) => task.id === taskID);

    if (taskIndex !== -1) {
      const newProgressOrder =
        tasks[taskIndex].progressOrder + directionNumber * 1; // Assuming each step is 1

      // Ensure the new progress order is within valid bounds
      if (newProgressOrder >= TASK_PROGRESS_ID.NOT_STARTED && newProgressOrder <= TASK_PROGRESS_ID.COMPLETED) {
        const updatedTasks: Task[] = tasks.map((task) =>
          task.id === taskID ? { ...task, progressOrder: newProgressOrder } : task
        );
        setTasks(updatedTasks);
      }
    }
  };

  return {
    completeTask,
    moveTaskCard,
  }
}