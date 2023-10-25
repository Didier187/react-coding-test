import { useNavigate } from "react-router-dom";
export default function Logo() {
    const navigate = useNavigate();
    const goBack = () => {
        if (window.location.pathname.includes("/questions/")) {
          navigate(-1);
        } else {
          navigate("/");
        }
      };
  return <h1 onClick={goBack}>Bison.io</h1>;
}
