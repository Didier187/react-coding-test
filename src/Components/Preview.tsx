export default function Preview({
  iframeRef,
}: {
  iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
}) {
  return <iframe ref={iframeRef} className="preview"></iframe>;
}
