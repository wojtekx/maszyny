import { MachineItem } from './MachineItem';
import { useEffect, useState } from 'react';
import { getListMachines } from '../service/localstorage';

export const MachineList = () => {
    const [machines, setMachines] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentMachine, setCurrentMachine] = useState({date: '', name: ''});

    useEffect(() => {
        setMachines(getListMachines());
    }, []);

    const createModal = (date, name) => {
        setModalVisible(true);

        setCurrentMachine({ date: date, name: name })
    }

    useEffect(() => {
        machines.forEach(machine => {
            if (!!localStorage['shouldRenderModal']
                && machine.customSwitch
                && ((new Date(machine.nextDate).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) < 30
                ) {

                createModal(machine.nextDate, machine.name);
            }
        })
    }, []);
    
    return (
        <div>
            {
                machines.length > 0 ? (
                    <div className="card bg-secondary p-3">
                        <div className='customModal' style={{ display: isModalVisible ? 'block' : 'none' }}>
                            Dnia <strong>{currentMachine.date}</strong> kończy się przegląd maszyny <strong>{currentMachine.name}</strong>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nazwa</th>
                                    <th scope="col" style={{maxWidth: 200}}>Szczegóły</th>
                                    <th scope="col">Data przeglądu</th>
                                    <th scope="col">Następny przegląd</th>
                                    <th scope="col">Akcje</th>
                                </tr>
                              
                            </thead>
                          
                            <tbody style={{borderTop: '1px solid #b7b7b7'}}>
                                {
                                    machines.map(machine => <MachineItem machine={machine} key={machine.id} setMachines={setMachines} />)
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h3 className="text-center">Brak danych</h3>
                )
            }

        </div>
    )
}
