import { MachineList } from "./components";
import { Navbar } from "./components";
import { MachineForm } from "./components";
import { Route, Routes } from "react-router-dom";

export const App = () => (
  <div>
    <Navbar />
    <div className="">
      <Routes>
        <Route path="/" element={<MachineList />} />
        <Route path="/create-machine" element={<MachineForm />} />
        <Route path="/edit-machine/:id" element={<MachineForm />} />
      </Routes>
    </div>
  </div>
);
