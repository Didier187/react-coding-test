import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import AddTask from "../icons/AddTask";
import AddedTask from "../icons/AddedTask";
import EyeOpen from "../icons/EyeOpen";
import { QuestionProps } from "./Questions";
import styles from "./Questions.module.css";

const Question = ({ question }: { question: QuestionProps }) => {
  const navigate = useNavigate();

  const addQuestionToAssignment = useBoundStore((state) => state.addQuestion);
  const removeQuestionFromAssignment = useBoundStore(
    (state) => state.removeQuestion
  );
  const questions = useBoundStore((state) => state.questions);
  const isInAssignment = questions.some((item) => item._id === question._id);

  const handleAddAndRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: "questions" | "shortlist"
  ) => {
    e.stopPropagation();

    switch (type) {
      case "questions":
        if (questions.includes(question)) {
          removeQuestionFromAssignment(question._id);
        } else {
          addQuestionToAssignment(question);
        }
        break;
      default:
        break;
    }
  };

  return (
    <li
      onClick={() => {
        navigate(`/questions/${question._id}`);
      }}
      className={styles.question}
    >
      <div className={styles["question-header"]}>
        <span
          className={styles["question-level"] + " " + styles[question.level]}
          title="Question difficulty"
        >
          {question.level}
        </span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: question.prompt }} />
      <div className={styles["question-footer"]}>
        <button
          className={styles["add-question-btn"]}
          title="Add Question to the assignment"
          onClick={(e) => handleAddAndRemove(e, "questions")}
        >
          {isInAssignment ? <AddedTask /> : <AddTask />}
          {isInAssignment ? "Remove " : "Add "} Question
        </button>
        <button
          title="View Question details"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/questions/${question._id}`);
          }}
        >
          <EyeOpen />
          View Question
        </button>
      </div>
    </li>
  );
};

export default Question;
