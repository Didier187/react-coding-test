import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import styles from "./Header.module.css";
import Modal from "../modal/ModalComponent";
import CreateAssignement from "../create-task/CreateAssignment";
import { Dropdown } from "./Header";
import ShortList from "../icons/ShortList";
import AddTask from "../icons/AddTask";

export default function Header() {
  const navigate = useNavigate();
  const questions = useBoundStore((state) => state.questions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles["layout"]}>
        <h1
          onClick={() => {
            navigate(-1);
          }}
        >
          Bison.io
        </h1>
        <div className={styles.right}>
          <Link
            to="create-assignment"
            onClick={openModal}
            className={styles["assignment-btn"]}
          >
            <AddTask />
            <span className={styles["assignment-question-count"]}>
              {questions.length}
            </span>
          </Link>
          <Link to="/questions/shortlist">
            <ShortList />
            Shortlist
          </Link>

          <Dropdown />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create an assignment"
      >
        <CreateAssignement closeModal={setIsModalOpen} />
      </Modal>
    </div>
  );
}
