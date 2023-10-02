export default function LoadingScreen({
  isLoading,
  state,
}: {
  isLoading: boolean;
  state: Array<string>;
}) {
  return (
    <>
      {isLoading && (
        <div className="loading">
          {state.map((state, index) => (
            <div key={index}>{state}</div>
          ))}
        </div>
      )}
    </>
  );
}
