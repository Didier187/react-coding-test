import styles from "./Submissions.module.css";
import { useNavigate } from "react-router-dom";
type AssignedQuestion = {
  _id: string;
  prompt: string;
  level: string;
  files: Array<string>;
};
export interface SubmissionI {
  _id: string;
  name: string;
  number: string;
  email: string;
  assignedQuestion: Array<AssignedQuestion>;
  assignedBy: string;
  isArchived: boolean;
  isSubmitted: boolean;
  assignedDate: string;
}
// function to format date to Australian format (dd/mm/yyyy)
function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default function SubmissionCard(props: SubmissionI) {
  const { _id,name, number, assignedQuestion, assignedDate, isSubmitted } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div>
        <h3>Sent to : {name}</h3>
        <span>Difficulty: {assignedQuestion[0]?.level}</span>
      </div>
      <p>{number}</p>
      <div className={styles["card-footer"]}>
      <span>created at: {formatDate(assignedDate)}</span>
        {isSubmitted ? (
          <button onClick={()=>{
            navigate(`/submissions-tasks/${_id}`)
          }}>Review submission</button>
        ) : (
          <span className={styles.pending}>Pending submission</span>
        )}
      </div>
    </div>
  );
}
