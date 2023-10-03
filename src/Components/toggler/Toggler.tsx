import React,{useState} from "react";

export default function Toggler({
  children,
}: {
  children: (args: {
    isToggled: boolean;
    setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
  }) => JSX.Element;
}) {
  const [isToggled, setIsToggled] = useState(true);
  return <div>{children({ isToggled, setIsToggled })}</div>;
}
