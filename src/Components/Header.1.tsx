import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBoundStore } from "../store";
import styles from "../styles/Header.module.css";
import Modal from "./ModalComponent";
import CreateAssignement from "./CreateAssignment";
import { Dropdown } from "./Header";

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
            <span className="material-symbols-outlined">assignment_add</span>{" "}
            <span className={styles["assignment-question-count"]}>
              {questions.length}
            </span>
          </Link>
          <Link to="/questions/shortlist">
            <span className="material-symbols-outlined">
              format_list_bulleted
            </span>{" "}
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
