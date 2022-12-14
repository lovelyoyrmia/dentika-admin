import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./services/FirebaseAuthContext";
import { ROUTES } from "./constant/routes";
// import NavbarWrapper from "./components/navbar/NavbarWrapper";
import { ListSidebar } from "./constant/constants";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./services/ProtectedRoute";
import PatientProfile from "./components/patients/PatientProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <NavbarWrapper /> */}
        <Routes>
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<Home />}>
              {ListSidebar.map((side) => {
                return (
                  <Route
                    key={side.id}
                    path={side.path}
                    element={side.element}
                  />
                );
              })}
              <Route path={ROUTES.SHOW_PATIENT} element={<PatientProfile />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
