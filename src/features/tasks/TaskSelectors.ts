import { selector } from 'recoil'
import { tasksState } from './TaskAtoms'
import type { Task } from '../../types'

export const uncompletedTasksSelector = selector<Task[]>({
  key: 'uncompletedTasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder !== 4
    })
  },
})

export const completedTasksSelector = selector<Task[]>({
  key: 'completedTasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 4
    })
  },
})