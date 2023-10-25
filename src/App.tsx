import { Navigate, Route, Routes } from "react-router-dom";
import About from "./Components/about/About";
import CreateAccount from "./Components/create-account/CreateAccount";
import Navigation from "./Components/home/Navigation";
import Login from "./Components/login/Login";
import MainFrame from "./Components/main-frame/MainFrame";
import NotFound from "./Components/not-found/NotFound";
import Questions from "./Components/question/Questions";
import QuestionsDetails from "./Components/question/QuestionsDetails";
import ShortList from "./Components/shortlist/ShortList";
import { useBoundStore } from "./store";
import TaskScreen from "./Components/task/TaskScreen";
import Home from "./Components/home/Home";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route
          path="/questions"
          element={
            <PrivateRoute>
              <MainFrame />
            </PrivateRoute>
          }
        >
          <Route path="" index element={<Questions />} />
          <Route path=":id" element={<QuestionsDetails />} />
          <Route path="shortlist" element={<ShortList />} />
          {/* creating an illusion that we have not moved while in the modal */}
          <Route path="create-assignment" element={<Questions />} />
        </Route>
        <Route path="/task" element={<TaskScreen />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useBoundStore((state) => state.token);
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};
