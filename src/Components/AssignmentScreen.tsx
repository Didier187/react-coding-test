import { FileSystemTree, WebContainer } from "@webcontainer/api";
import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import "../App.css";
import Editor from "./Editor";
import FileStructure from "./FileStructure";
import Header from "./Header.1";
import LoadingScreen from "./LoadingScreen";
import Preview from "./Preview";
import PromptComp from "./PromptComp";
import TerminalComponent from "./TerminalComponent";
import "../userWorker";
import transformFilesFromDb from "../helpers/replaceUnderScoreWithPoint";
import {
  installDependencies,
  startDevServer,
} from "../helpers/bootingWebContainer";
import { useBoundStore } from "../store";

type FileTree = {
  initialFiles: FileSystemTree;
};

function AssignmentScreen() {
  const [loadingStates, setLoadingStates] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [indexFromDb, setIndexFromDb] = React.useState<string | undefined>("");
  const [questionData, setQuestionData] = React.useState<{
    level: string;
    prompt: string;
  }>({ level: "", prompt: "" });

  const [wCInstance, setwContainer] = React.useState<WebContainer | null>(null);

  const [files, setFiles] = React.useState<FileTree>();

  const terminalRef = useRef<HTMLDivElement>(null);
  const iframeEl = useRef<HTMLIFrameElement>(null);

  const fetchFiles = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/questions/6503d849e7f25a9b3fb85d4a`
    );
    const data = await response.json();
    return data;
  };
  const currentFileState = useBoundStore((state) => state.currentEditableFile);
  console.log(currentFileState, "currentFileState");

  useEffect(() => {
    const bootContainer = async () => {
      try {
        setLoadingStates((prev) => [...prev, "booting"]);
        const fitAddon = new FitAddon();
        // Initialize Terminal
        const terminal = new Terminal({ convertEol: true });
        terminal.loadAddon(fitAddon);
        terminalRef.current && terminal.open(terminalRef.current);
        fitAddon.fit();
        terminal.write("Installing dependencies...\r\n");

        // Initialize WebContainer
        const webcontainerInstance = await WebContainer.boot();
        setwContainer(webcontainerInstance);
        // Mount files
        const filesFromDb = await fetchFiles();
        setQuestionData({
          level: filesFromDb.level || "",
          prompt: filesFromDb.prompt || "",
        });

        const files = filesFromDb && transformFilesFromDb(filesFromDb);

        setFiles(files);
        // setIndexFromDb(files.src.directory["App.tsx"].file.contents);
        files && (await webcontainerInstance.mount(files));
        // const currentFile = await webcontainerInstance.fs.readFile(
        //   currentFileState,
        //   "utf-8"
        // );
        // console.log(currentFile);
        // setIndexFromDb(currentFile);
        // Install dependencies
        await installDependencies(
          terminal,
          webcontainerInstance,
          setLoadingStates
        );

        // Start dev server
        await startDevServer(
          terminal,
          webcontainerInstance,
          setLoadingStates,
          iframeEl,
          setIsLoading
        );
      } catch (error) {
        console.error("Error:", error);
        setLoadingStates((prev) => [
          ...prev,
          "error booting the container! refresh the page.",
        ]);
      }
    };

    bootContainer();
  }, []);

  useEffect(() => {
    const currentFile = async () => {
      const currentFile = await wCInstance?.fs.readFile(
        currentFileState,
        "utf-8"
      );
      setIndexFromDb(currentFile);
    };
    currentFile();
  }, [currentFileState, wCInstance]);

  async function writeIndexJS(
    content: string,
    webcontainerInstance: WebContainer | null
  ) {
    setIndexFromDb(content);
    webcontainerInstance &&
      (await webcontainerInstance.fs.writeFile(currentFileState, content));
  }
  // handle submit
  //-read all the file from the webcontainer
  //call the datase and upldate the file with the new content
  const handleSubmit = async () => {
    const files = await wCInstance?.fs.readdir("/src");
    //    ^ is an array of strings
    // console.log(files);
    if (files) {
      const fileContents = await Promise.all(
        files.map((file) => wCInstance?.fs.readFile(`/src/${file}`, "utf-8"))
      );
      // console.log(fileContents);
      const forSubmission = {
        initialFiles: {
          src: {
            directory: {
              App_tsx: {
                file: {
                  contents: JSON.stringify(fileContents[0]),
                },
              },
              main_tsx: {
                file: {
                  contents: JSON.stringify(fileContents[1]),
                },
              },
              index_css: {
                file: {
                  contents: JSON.stringify(fileContents[2]),
                },
              },
            },
          },
        },
      };
      //   const response = await fetch(
      //           `${import.meta.env.VITE_SERVER_URL}/questions/6503d849e7f25a9b3fb85d4a`,
      //     {
      //       method: "PATCH",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(forSubmission),
      //     }
      //   );
      //   console.log( JSON.stringify(forSubmission));
    }
  };
  return (
    <>
      <LoadingScreen isLoading={false} state={loadingStates} />
      <div className="container">
        <div className="question">
          <button onClick={handleSubmit}>submit test</button>
          <PromptComp questionData={questionData} />
          {files && <FileStructure structure={files} path={[]} />}
        </div>
        <Header />
        <div className="content">
          <Editor
            indexFromDb={indexFromDb}
            writeIndexJS={writeIndexJS}
            wCInstance={wCInstance}
          />

          <Preview iframeRef={iframeEl} />
          <TerminalComponent terminalRef={terminalRef} />
        </div>
      </div>
    </>
  );
}

export default AssignmentScreen;
