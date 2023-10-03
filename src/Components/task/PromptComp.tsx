import Toggler from "../toggler/Toggler";

export default function PromptComp({
  questionData,
}: {
  questionData: {
    level: string;
    prompt: string;
  };
}) {
  return (
    <Toggler>
      {({ isToggled, setIsToggled }) => (
        <div>
          <button
            onClick={() => {
              setIsToggled(!isToggled);
            }}
          >
            {isToggled ? "Hide" : "Show"} Question
          </button>

          {isToggled && (
            <div
              dangerouslySetInnerHTML={{
                __html: questionData.prompt,
              }}
            />
          )}
        </div>
      )}
    </Toggler>
  );
}
