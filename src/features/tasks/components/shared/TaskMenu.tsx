import { useState } from 'react'
import type { Dispatch, SetStateAction } from "react"
import type { CSSProperties, Task } from "../../../../types"
import { useTasksAction } from '../hooks/Tasks'
import TaskModal from './TaskModal'
import { TASK_MODAL_TYPE } from '../../../../constants/app'

interface TaskMenuProps {
  setIsMenuOpen : Dispatch<SetStateAction<boolean>>
  task : Task
}
const TaskMenu = ({task}: TaskMenuProps) => {
  
  const [type, setType] = useState<string>(TASK_MODAL_TYPE.ADD)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const {deleteTask} = useTasksAction()
  
  return (
    <div style={styles.menu} className='dropdown__menu'>
      <div 
        style={styles.menuItem}
        onClick={(): void => {
          setType(TASK_MODAL_TYPE.EDIT)
          setIsModalOpen(true)
        }}
        >
        <span className="material-icons">edit</span>Edit
      </div>
      <div 
        style={styles.menuItem} 
        onClick={(): void => {
          deleteTask(task.id)
          }}>
        <span className="material-icons">delete</span>Delete
      </div>
      {isModalOpen && (
        <TaskModal 
          headingTitle={type === TASK_MODAL_TYPE.ADD ? 'Add your task' : 'Edit your task'}
          setIsModalOpen={setIsModalOpen}
          type={type}
          defaultProgressOrder={task.progressOrder}
          selectedData={task}
        />

      )}
    </div>
  )
}

const styles: CSSProperties = {
  menu: {
    backgroundColor: '#fff',
    border: '1px solid gray',
    padding: '8px 16px',
    position: 'absolute',
    top: '-10px',
    right: '4%',
    zIndex: 10,
  },
  menuItem: {
    display: 'flex',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  closeIcon: {
    position: 'absolute',
    top: '0px',
    right: '2px',
    cursor: 'pointer',
  },
}

export default TaskMenu
