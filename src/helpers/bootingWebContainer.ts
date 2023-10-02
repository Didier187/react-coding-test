import { WebContainer } from "@webcontainer/api";
import { Terminal } from "xterm";

const installDependencies = async (
    terminal: Terminal,
    webcontainerInstance: WebContainer,
    setLoadingStates: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setLoadingStates((prev) => [...prev, "installing dependencies"]);
    const installProcess = await webcontainerInstance.spawn("npm", ["install"]);
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );
    const exitCode = await installProcess.exit;
    if (exitCode !== 0) {
      setLoadingStates((prev) => [...prev, "Error installing dependencies"]);
      throw new Error("Failed to install dependencies");
    }
  };

  const startDevServer = async (
    terminal: Terminal,
    webcontainerInstance: WebContainer,
    setLoadingStates: React.Dispatch<React.SetStateAction<string[]>>,
    iframeEl: React.RefObject<HTMLIFrameElement>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoadingStates((prev) => [...prev, "starting dev server"]);
    const serverProcess = await webcontainerInstance.spawn("npm", [
      "run",
      "dev",
    ]);

    serverProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );

    webcontainerInstance.on("server-ready", (port: number, url: string) => {
      if (iframeEl.current) {
        iframeEl.current.src = url;
      }
    });
    startShell(terminal, webcontainerInstance, setLoadingStates,setIsLoading);
  };

  async function writeIndexJS(
    content: string,
    webcontainerInstance: WebContainer | null
  ) {
    webcontainerInstance &&
      (await webcontainerInstance.fs.writeFile("/src/App.tsx", content));
  }

  async function startShell(
    terminal: Terminal,
    webcontainerInstance: WebContainer,
    setLoadingStates: React.Dispatch<React.SetStateAction<string[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setLoadingStates((prev) => [...prev, "starting shell"]);
    const shellProcess = await webcontainerInstance.spawn("jsh", {
      terminal: {
        cols: terminal.cols,
        rows: terminal.rows,
      },
    });
    shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );

    const input = shellProcess.input.getWriter();
    terminal.onData((data) => {
      input.write(data);
    });

    setLoadingStates((prev) => [...prev, "shell starting"]);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return shellProcess;
  }

    export { installDependencies, startDevServer, writeIndexJS, startShell };