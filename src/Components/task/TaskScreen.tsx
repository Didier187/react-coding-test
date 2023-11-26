import { useSearchParams } from "react-router-dom";
import styles from "./TaskScreen.module.css";
import {
  useSandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import useTaskStore from "../../store/taskStore";
import { ReactNode, useEffect } from "react";
import Done from "../icons/Done";
import Submitted from "./Submitted";
import Loading from "./Loading";

function Task() {
  const [searchParam] = useSearchParams();
  const fetchTask = useTaskStore((state) => state.fetch);
  const assignment = useTaskStore((state) => state.assignment);
  const error = useTaskStore((state) => state.error);
  const isFetching = useTaskStore((state) => state.isFetching);
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  useEffect(() => {
    fetchTask(searchParam.get("ttkn"));
  }, [searchParam, fetchTask]);

  const handleSubmitAssignment = async () => {
    if (!assignment) return;

    const submittable = assignment.assignedQuestion[0];

    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/tasks/submit/${assignment._id}`,
        {
          assignedQuestion: [
            {
              level: submittable.level,
              prompt: submittable.prompt,
              _id: submittable._id,
              files: {
                ...files,
              },
            },
          ],
        }
      )
      .then(function (response) {
        // TODO notify the user of success
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
       
        // TODO notify the user of the error
      });
  };
  if (isFetching) return <Loading />;
  if (error) return <Submitted message={error} />;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles["header-container"]}>
          <p>
            Hi {assignment?.name.split(" ")[0]}, welcome to your assignment!{" "}
          </p>
          <button
            onClick={async () => {
              await handleSubmitAssignment();
            }}
          >
            <Done />
            Submit
          </button>
        </div>
      </div>
      <div className={styles["main"]}>
        <SandpackLayout
          style={{
            width: "100%",
          }}
        >
          <SandpackCodeEditor
            showInlineErrors
            showLineNumbers
            closableTabs
            wrapContent
            className="sandbox-editor"
          />
          <SandpackPreview
            showNavigator
            className="sandbox-preview"
            showRefreshButton={false}
            showOpenInCodeSandbox={false}
          />
        </SandpackLayout>
      </div>
    </div>
  );
}
const TaskScreen = () => {
  return (
    <SandBoxProviderWrapper>
      <Task />
    </SandBoxProviderWrapper>
  );
};

export default TaskScreen;

const SandBoxProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [searchParam] = useSearchParams();
  const fetchTask = useTaskStore((state) => state.fetch);
  const assignment = useTaskStore((state) => state.assignment);

  useEffect(() => {
    fetchTask(searchParam.get("ttkn"));
  }, [searchParam, fetchTask]);

  return (
    <>
      <SandpackProvider
        theme="dark"
        template="react"
        files={assignment?.assignedQuestion[0]?.files}
        options={{
          classes: {
            "sp-wrapper": "custom-wrapper",
          },
        }}
      >
        {children}
      </SandpackProvider>
    </>
  );
};
