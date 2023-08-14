export const getListMachines = () => {
  if (!localStorage["machines"]) {
    localStorage["machines"] = "[]";
  }

  localStorage["currentday"] = new Date().getDay();
  localStorage['shouldRenderModal'] = localStorage["currentday"] != new Date().getDay()

  let machines = localStorage["machines"];
  machines = JSON.parse(machines);
  return machines;
};

export const addMachine = (machine) => {
  const machines = getListMachines();
  machines.push(machine);
  localStorage["machines"] = JSON.stringify(machines);
};

export const removeMachine = (id) => {
  let machines = getListMachines();
  machines = machines.filter((machine) => machine.id !== id);
  localStorage["machines"] = JSON.stringify(machines);
};

export const getMachineById = (id) => {
  const machines = getListMachines();
  const machine = machines.find((machine) => machine.id === id);
  return machine;
};

export const editMachine = (id, newMachine) => {
  let machines = getListMachines();
  machines = machines.filter((machine) => machine.id !== id);
  machines.push(newMachine);
  localStorage["machines"] = JSON.stringify(machines);
};