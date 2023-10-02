export default function TerminalComponent({
    terminalRef,
  }: {
    terminalRef: React.MutableRefObject<HTMLDivElement | null>;
  }) {
    return <div ref={terminalRef} className="terminal"></div>;
  }
  