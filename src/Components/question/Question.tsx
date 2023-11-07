import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import { QuestionProps } from "./Questions";
import styles from "./Questions.module.css";
import EyeOpen from "../icons/EyeOpen";
import HeartNeutral from "../icons/HeartNeutral";
import HeartHighlighted from "../icons/HeartHighlighted";
import AddTask from "../icons/AddTask";
import AddedTask from "../icons/AddedTask";

const Question = ({ question }: { question: QuestionProps }) => {
  const navigate = useNavigate();

  const addToShortlist = useBoundStore((state) => state.addToShortList);
  
  const removeFromShortlist = useBoundStore(
    (state) => state.removeFromShortList
  );

  const addQuestionToAssignment = useBoundStore((state) => state.addQuestion);
  const removeQuestionFromAssignment = useBoundStore(
    (state) => state.removeQuestion
  );
  const questions = useBoundStore((state) => state.questions);

  const shortList = useBoundStore((state) => state.shortList);

  const handleFavorite = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (shortList.includes(question)) {
      removeFromShortlist(question);
    } else {
      addToShortlist(question);
    }
  };

  const handleAddQuestion = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (questions.includes(question)) {
      removeQuestionFromAssignment(question._id);
    } else {
      addQuestionToAssignment(question);
    }
  };

  const isFavorite = shortList.some((item) => item._id === question._id);
  const isInAssignment = questions.some((item) => item._id === question._id);

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
        <button
          onClick={handleFavorite}
          title={isFavorite ? "Remove from shortlist" : "Add to shortlist"}
        >
          {isFavorite ? <HeartHighlighted /> : <HeartNeutral />}
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: question.prompt }} />
      <div className={styles["question-footer"]}>
        <button
          className={styles["add-question-btn"]}
          title="Add Question to the assignment"
          onClick={handleAddQuestion}
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
