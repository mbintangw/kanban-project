import { useRecoilValue } from 'recoil'
import { completedTasksSelector, uncompletedTasksSelector } from '../TaskSelectors'
import type { Task, CSSProperties } from '../../../types'
import { Link } from 'react-router-dom'

const TaskSummary = (): JSX.Element => {
  const completedTasks = useRecoilValue<Task[]>(completedTasksSelector)

  const uncompletedTasks = useRecoilValue<Task[]>(uncompletedTasksSelector)

  return (
    <main style={styles.container}>

      <h1 style={styles.heading}>Summary of Your Task</h1>

      <section style={styles.list}>
        <span className='material-icons'>check_circle</span>
        <h2>You have completed {completedTasks.length}{' '}{completedTasks.length <=1 ? 'task' : 'tasks'} </h2>
      </section>

      <section style={styles.list}>
        <span className='material-icons'>list</span>
        <h2>You still have {uncompletedTasks.length} {' '} {uncompletedTasks.length <= 1 ? 'task' : 'tasks'}</h2>
      </section>

      <nav style={styles.links}>
        <Link to ="/task-list" style={styles.link}>See Your Task List</Link>
        <Link to= "/task-progress" style={styles.link}>Manage Your Task Progress</Link>
      </nav>

    </main>
  )
}

const styles: CSSProperties = {
  container: {
    padding:'40px',
    width: '100%',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px'
  },
  list: {
    color: '#fff',
    backgroundColor: '#55C89f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
    width: '60%',
  },
  links:  {
    display: 'flex',
  },
  link: {
    padding: '16px',
    marginRight: '24px',
    backgroundColor: '#55ACC8',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
  },
}
export default TaskSummary
