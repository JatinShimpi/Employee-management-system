import { Route, Routes } from "react-router-dom";

import AppLayout from "./Applayout";
import Homepage from "./Homepage";
import About from "./About";
import Employeeslist from "./Employeeslist";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/employees" element={<Employeeslist/>}/>
          <Route path="/add-employee" element={<AddEmployee/>}/>
          <Route path="/update-employee/:id" element={<UpdateEmployee/>}/>
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
