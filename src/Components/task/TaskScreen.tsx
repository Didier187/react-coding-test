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

function Task() {
  const [searchParam] = useSearchParams();
  const fetchTask = useTaskStore((state) => state.fetch);
  const assignment = useTaskStore((state) => state.assignment);
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  useEffect(() => {
    fetchTask(searchParam.get("ttkn"));
  }, [searchParam, fetchTask]);

  const handleSubmitAssignment = async () => {
    if (!assignment) return;

    const submittable = assignment.assignedQuestion[0];
    const forSubmisson = {
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
    };

    console.log(forSubmisson);
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
