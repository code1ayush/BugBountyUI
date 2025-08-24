import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Nopage from "./pages/Nopage";
import Program from "./pages/ProgramPage";
import ProgramDetails from "./pages/ProgramDetailsPage";
import MyPrograms from "./pages/MyProgramsPage";
import MyProgramsDetails from "./pages/MyProgramDetailsPage"
import MyReports from "./pages/MyReportsPage";
import Rewards from "./pages/RewardsPage"
import LeaderBoard from "./pages/LeaderBoardPage"
import ProgramForm from "./pages/ProgramFormPage";
import ReportFormPage from "./pages/ReportFormPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import SubmittedReportPage from "./pages/SubmittedReportPage";
import SubmittedReportsDetailPage from "./pages/SubmittedReportsDetailPage";

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
          <Route path="/programform" element={<ProgramForm/>}/>
          <Route path="/reportform/:id" element={<ReportFormPage/>}/>
          <Route path="myreports/:id" element={<ReportDetailPage/>}/>
          <Route path="/submittedReports" element={<SubmittedReportPage/>}/>
          <Route path="/submittedReports/:id" element={<SubmittedReportsDetailPage/>}/>
        </Route>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
