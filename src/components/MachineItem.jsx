import React from 'react'
import { removeMachine } from '../service/localstorage';
import { getListMachines } from '../service/localstorage';
import { useNavigate } from 'react-router-dom';

export const MachineItem = ({ machine, setMachines }) => {
    const { id, name, date, nextDate, desc, customSwitch } = machine;
    const navigate = useNavigate();

    const deleteMachine = () => {
        removeMachine(id);
        setMachines(getListMachines());
    }

    const showAlert = customSwitch && ((new Date(machine.nextDate).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) < 30;
    
    return (
        <tr style={!!showAlert ? { backgroundColor: '#ff9494', color: 'black', border: '1px solid black' } : {color: 'black'} }>
            <th style={{maxWidth: 200}}>{name}</th>
            <td style={{maxWidth: 200}}>{desc}</td>
            <td>{date}</td>
            <td>{nextDate}</td>
            <td style={{width: 160}}>
                <div className="d-flex gap-3">
                    <span type="button" className="badge bg-success" onClick={() => navigate(`/maszyny/edit-machine/${id}`)}>Edycja</span>
                    <span type="button" className="badge bg-danger" onClick={() => deleteMachine()}>Usuń</span>
                </div>
            </td>
        </tr>
    )
}
