import { useRecoilValue } from 'recoil'
import { tasksState } from '../../TaskAtoms'
import TaskListItem from './TaskListItem'
import type {Task, CSSProperties} from '../../../../types'
import { useState } from 'react'
import TaskModal from '../shared/TaskModal'
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE } from '../../../../constants/app'


const TaskList = () => {
  const tasks: Task[] = useRecoilValue(tasksState)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Your Tasks</h1>
      <div style={styles.taskButtons}>
        <button style={styles.button} onClick={(): void => {setIsModalOpen(true)}}><span className="material-icons">add</span>Add Task</button>
        <button style={styles.button}><span className="material-icons">sort</span>Filter tasks</button>
      </div>
      {isModalOpen && (
        <TaskModal 
          headingTitle = "Add your task"
          type = {TASK_MODAL_TYPE.ADD}
          setIsModalOpen = {setIsModalOpen}
          defaultProgressOrder = {TASK_PROGRESS_ID.NOT_STARTED}
        />
      )}

      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <section style={styles.tableHeaderTaskName}>
            Task Name
          </section>
          <section style={styles.tableHeaderDetail}>
            Detail
          </section>
          <section style={styles.tableHeaderDueDate}>
            Due Date
          </section>
          <section style = {styles.tableHeaderProgress}>
            Progress
            </section>
        </thead>
        {tasks.map((task: Task) => {
          return <TaskListItem task={task} key = {task.id}/>
        })}
      </table>
    </main>
  )
}

const styles: CSSProperties = {
  container: {
    padding: '20px',
    width: '100%',
  },
  table: {
    width: '100%',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
  },
  taskButtons: {
    display: 'flex',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    padding: '16px',
    fontSize: '16px',
    marginRight: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  tableHead: {
    display: 'flex',
    fontSize: '24px',
    borderBottom: '1px solid #D8D8D8',
  },
  tableHeaderTaskName: {
    padding: '16px',
    width: '15%',
  },
  tableHeaderDetail: {
    padding: '16px',
    width: '30%',
  },
  tableHeaderDueDate: {
    padding: '16px',
    width: '10%',
  },
  tableHeaderProgress: {
    padding: '16px',
    width: '15%',
  },
}

export default TaskList
