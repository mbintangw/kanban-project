import { useRecoilState } from "recoil";
import { tasksState } from "../../TaskAtoms";
import type { Task } from "../../../../types";
import { TASK_PROGRESS_ID } from "../../../../constants/app";

interface useTaskActionType {
  completeTask: (taskID : number) => void
  moveTaskCard: (taskID : number, directionNumber : 1 | -1) => void
  addTask: (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void

  editTask: (body: Task) => void
  deleteTask: (taskID: number) => void
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
    const moveTask: Task[] = tasks.map((task) =>
      task.id === taskID ? { ...task, progressOrder: task.progressOrder + directionNumber } : task
    )
    setTasks(moveTask)
  }

  const addTask = (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ): void => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      detail,
      dueDate,
      progressOrder,
    }
    setTasks([...tasks, newTask])
  }
  
  const editTask = (body: Task): void => {
    const updatedTasks: Task[] = tasks.map((task) => (task.id === body.id ? { ...body } : task))
    setTasks(updatedTasks)
  }

  const deleteTask = (taskID: number): void => {
    const updatedTasks : Task[] =  tasks.filter((task) => task.id !== taskID)
    setTasks(updatedTasks)
  }


  return {
    completeTask,
    moveTaskCard,
    addTask,
    editTask,
    deleteTask,
  }

};

