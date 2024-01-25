import { useRecoilState } from "recoil";
import { tasksState } from "../../TaskAtoms";
import type { Task } from "../../../../types";
import { TASK_PROGRESS_ID } from "../../../../constants/app";

interface useTaskActionType {
  completeTask: (taskID : number) => void
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

  return {
    completeTask,
  }
}