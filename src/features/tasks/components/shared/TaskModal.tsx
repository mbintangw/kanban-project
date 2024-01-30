import type { Dispatch, SetStateAction } from "react"
import type { CSSProperties, Task} from "../../../../types"
import TaskForm from "./TaskForm"

interface TaskModalProps {
  headingTitle : string,
  type: string,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  defaultProgressOrder : number,
  selectedData : Task
}

const TaskModal = ({headingTitle, type, setIsModalOpen, defaultProgressOrder,  selectedData}: TaskModalProps) => {
  return (
    <main style={styles.container} data-testid="task-modal">
      <div style={styles.modalTop}>
        <h1>{headingTitle}</h1>
        <span className="material-icons" style={styles.icon} onClick={(): void => {setIsModalOpen(false)}} data-testid="close-modal-button">close</span>
      </div>
      <TaskForm type={type} defaultProgressOrder={defaultProgressOrder} setIsModalOpen={setIsModalOpen} selectedData={selectedData}/>
    </main>
  )
}

const styles: CSSProperties = {
  container: {
    border: '1px solid gray',
    position: 'fixed',
    top: '20%',
    left: '40%',
    width: '25%',
    backgroundColor: '#fff',
    padding: '28px',
    zIndex: 10,
  },
  modalTop: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    cursor: 'pointer',
  },
}
export default TaskModal
