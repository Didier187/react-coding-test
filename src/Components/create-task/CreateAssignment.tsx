import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useBoundStore } from "../../store";
import FormError from "../form-error/FormError";
import styles from "./CreateTask.module.css";
import Progress from "../icons/Progress";
import Remove from "../icons/Remove";
import Emoticon from "../icons/Emoticon";

interface CreateTaskProps {
  name: string;
  email: string;
  number: string;
}

export default function CreateAssignement({
  closeModal,
}: {
  closeModal: (val: boolean) => void;
}) {
  const questions = useBoundStore((state) => state.questions);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskProps>();
  const token = useBoundStore((state) => state.token);
  const onSubmit: SubmitHandler<CreateTaskProps> = (data) => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/tasks`,
        {
          ...data,
          assignedQuestion: questions.map((q) => q._id),
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (questions.length === 0) {
    return (
      <div className={styles["empty"]}>
        <Emoticon />
        <p>
          Please add questions to the assignment before you can create the
          assignable task.
        </p>
        <Link
          to="/questions"
          onClick={() => {
            closeModal(false);
          }}
        >
          Browse questions
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.count}>
        <span>
          {questions.length === 0
            ? "No questions added to the assignment"
            : questions.length === 1
            ? "1 question added to the assignment"
            : `${questions.length} questions added to the assignment`}
        </span>
      </div>
      <div className={styles["questions-container"]}>
        {questions.map((question) => (
          <div key={question._id} className={styles.question}>
            <div className={styles["question-header"]}>
              <span
                className={
                  styles["question-level"] + " " + styles[question.level]
                }
                title="Question difficulty"
              >
                {question.level}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  useBoundStore.getState().removeQuestion(question._id);
                }}
                title="Remove question from assignment"
              >
                <Remove />
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className={styles.guide}>
        Please, Add details for whom this assignment is for, and what is the
        purpose of this assignment.
      </p>
      {/* name, email and number and button to create assignment */}
      <div className={styles["form-container"]}>
        <h3>Assign to</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form-field"]}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Smith"
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            <FormError
              isVisible={errors.name}
              errorMessage={"This field is required"}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="John@Smith.com"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            <FormError
              isVisible={errors.email}
              errorMessage={
                errors.email && errors.email.type === "required"
                  ? "This field is required"
                  : "Please enter a valid email"
              }
            />
          </div>

          <div className={styles["form-field"]}>
            <label htmlFor="number">Number</label>
            <input
              id="number"
              type="text"
              placeholder="John Smith"
              {...register("number", { required: true })}
              aria-invalid={errors.number ? "true" : "false"}
            />
            <FormError
              isVisible={errors.number}
              errorMessage={
                errors.number && errors.number.type === "required"
                  ? "This field is required"
                  : "Please enter a valid number"
              }
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Progress />}
            Create Assignment
          </button>
        </form>
      </div>
    </div>
  );
}
