import { Route, Routes } from "react-router-dom";
import AppLayout from "./Applayout";
import Homepage from "./Homepage";
import About from "./About";
import Employeeslist from "./Employeeslist";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import Departmentslist from "./DepartmentsList";
import AddDepartment from "./AddDepartment";
import UpdateDepartment from "./UpdateDepartment";
import Loginpage from "./Loginpage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Signup from "./Signup";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Loginpage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<AppLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/dashboard/employees" element={<Employeeslist />} />
              <Route path="/dashboard/add-employee" element={<AddEmployee />} />
              <Route
                path="/dashboard/update-employee/:id"
                element={<UpdateEmployee />}
              />
              <Route path="/dashboard/about" element={<About />} />
              <Route
                path="/dashboard/departments"
                element={<Departmentslist />}
              />
              <Route
                path="/dashboard/add-department"
                element={<AddDepartment />}
              />
              <Route
                path="/dashboard/update-department/:id"
                element={<UpdateDepartment />}
              />
            </Route>
            <Route path="/dashboard/signup" element={<Signup />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};
export default App;
