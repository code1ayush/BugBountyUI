import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Nopage from "./pages/Nopage";
import Program from "./pages/Program";
import ProgramDetails from "./pages/ProgramDetails";
import MyPrograms from "./pages/MyPrograms";
import MyProgramsDetails from "./pages/MyProgramDetails"
import MyReports from "./pages/MyReports";
import Rewards from "./pages/Rewards"
import LeaderBoard from "./pages/LeaderBoard"

const App = () => {

  
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/auth" element={token ? <Navigate to="/" /> : <AuthPage />} />
        
        <Route
          path="/"
          element={token ? <Layout /> : <Navigate to="/landing" />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="programs" element={<Program />} />
          <Route path="/programs/:id" element={<ProgramDetails />} />
          <Route path="/myprograms" element = {<MyPrograms/>}/>
          <Route path="/myprograms/:id" element = {<MyProgramsDetails/>}/>
          <Route path="/myreports" element={<MyReports/>}/>
          <Route path="/rewards" element ={<Rewards/>}/>
          <Route path="/leaderboard" element={<LeaderBoard/>}/>
        </Route>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
