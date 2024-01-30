import { useRecoilValue } from 'recoil'
import { tasksState } from '../../TaskAtoms'
import TaskListItem from './TaskListItem'
import type {Task, CSSProperties} from '../../../../types'
import { useState } from 'react'
import TaskModal from '../shared/TaskModal'
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE } from '../../../../constants/app'
import TaskFilter from './TaskFilter'


const TaskList = () => {
  const tasks: Task[] = useRecoilValue(tasksState)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [type, setFilter] = useState<Array<number>>([0])

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Your Tasks</h1>
      <div style={styles.taskButtons}>
        <button 
          style={styles.button} 
          onClick={(): void => {
            setIsModalOpen(true)}}
            data-testid = "add-task-button"
            >
              <span className="material-icons">add</span>
              Add Task
        </button>
        <button 
          style={styles.button}
          onClick={():void => {
            setIsFilterOpen(true)
          }}
          >
            <span className="material-icons">sort</span>
            Filter tasks
        </button>
      </div>
      <div style={styles.table}>
        <div style={styles.tableHead}>
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
        </div>
        {tasks.filter((task) => {
          if (type.find((i) => i > 0)){
            return type.find((i) => task.progressOrder === i)
          }else{
            return true
          }
        })
        .map((task: Task) => {
          return <TaskListItem task={task} key = {task.id}/>
        })}
      </div>
      {isModalOpen && (
        <TaskModal 
          headingTitle = "Add your task"
          type = {TASK_MODAL_TYPE.ADD}
          setIsModalOpen = {setIsModalOpen}
          defaultProgressOrder = {TASK_PROGRESS_ID.NOT_STARTED}
          selectedData={{} as Task}
        />
      )}
      {isFilterOpen && <TaskFilter setFilter={setFilter} setIsFilterOpen={setIsFilterOpen}/>}
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
