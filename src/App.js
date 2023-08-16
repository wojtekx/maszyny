import { MachineList } from "./components";
import { Navbar } from "./components";
import { MachineForm } from "./components";
import { Route, Routes } from "react-router-dom";

export const App = () => (
  <div>
    <Navbar />
    <div className="">
      <Routes>
        <Route path="/maszyny" element={<MachineList />} />
        <Route path="/maszyny/create-machine" element={<MachineForm />} />
        <Route path="/maszyny/edit-machine/:id" element={<MachineForm />} />
      </Routes>
    </div>
  </div>
);
