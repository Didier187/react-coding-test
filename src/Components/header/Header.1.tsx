import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import styles from "./Header.module.css";
import Modal from "../modal/ModalComponent";
import CreateAssignement from "../create-task/CreateAssignment";
import { Dropdown } from "./Header";
import ShortList from "../icons/ShortList";
import AddTask from "../icons/AddTask";
import Logo from "./Logo";
import Received from "../icons/Received";

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
        <Logo />
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
          <Link to="/submissions-tasks">
            <Received />
            Submissions
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
