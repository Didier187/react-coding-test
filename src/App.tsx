import { Navigate, Route, Routes } from "react-router-dom";
import About from "./Components/About";
import CreateAccount from "./Components/CreateAccount";
import Home from "./Components/Home";
import Login from "./Components/Login";
import MainFrame from "./Components/MainFrame";
import NotFound from "./Components/NotFound";
import Questions from "./Components/Questions";

import QuestionsDetails from "./Components/QuestionsDetails";
import { useBoundStore } from "./store";
import ShortList from "./Components/ShortList";


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/about" element={<About />} />
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useBoundStore((state) => state.token);
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};
