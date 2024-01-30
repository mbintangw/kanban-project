import { useRef, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { CSSProperties } from "../../../../types";
import { TASK_PROGRESS_ID } from "../../../../constants/app";

interface TaskFilterProps {
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  setFilter: Dispatch<SetStateAction<Array<number>>>;
}

const TaskFilter = ({ setIsFilterOpen, setFilter }: TaskFilterProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = (): void => {
    setIsFilterOpen(false);
  };

  const handleMenuItemClick = (filter: Array<number>): void => {
    setFilter(filter);
    handleClose();
  };

  const handleOutsideClick = (event: MouseEvent): void => {
    // Check if the clicked element is outside the menu
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    // Add event listener for outside click when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <main style={styles.menu} ref={menuRef}>
      <section
        style={styles.menuItem}
        onClick={(): void => handleMenuItemClick([TASK_PROGRESS_ID.COMPLETED])}
      >
        <span className="material-icons" style={styles.icon}>
          done
        </span>
        Completed Tasks
      </section>
      <section
        style={styles.menuItem}
        onClick={(): void =>
          handleMenuItemClick([
            TASK_PROGRESS_ID.NOT_STARTED,
            TASK_PROGRESS_ID.IN_PROGRESS,
            TASK_PROGRESS_ID.WAITING,
          ])
        }
      >
        <span className="material-icons" style={styles.icon}>
          format_list_bulleted
        </span>
        Uncompleted
      </section>
      <section
        style={styles.menuItem}
        onClick={(): void => handleMenuItemClick([0])}
      >
        <span className="material-icons" style={styles.icon}>
          clear_all
        </span>
        All Task
      </section>
    </main>
  );
};

const styles: CSSProperties = {
  menu: {
    backgroundColor: "#fff",
    border: "1px solid gray",
    padding: "8px 16px",
    position: "absolute",
    top: "120px",
    left: "36%",
    zIndex: 10,
  },
  menuItem: {
    display: "flex",
    marginBottom: "8px",
    cursor: "pointer",
  },
  icon: {
    marginRight: "8px",
  },
};

export default TaskFilter;
