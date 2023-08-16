import { useNavigate, useParams } from 'react-router-dom';
import { addMachine, getMachineById } from '../service/localstorage';
import { useForm } from '../hooks/useForm';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import { editMachine } from '../service/localstorage';

export const MachineForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showAlert, setshowAlert] = useState(false);
    const [showValidationAlert, setShowValidationAlert] = useState(false);
    const { inputValues, handleInputChange, resetForm, setForm } = useForm({
        name: '',
        date: '',
        nextDate: '',
        desc: '',
        customSwitch: true,
    });

    useEffect(() => {
        if (id) {
            const machine = getMachineById(id);
            setForm(machine);
        } else {
            resetForm();
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            if(inputValues.name) {
                setShowValidationAlert(false)
                editMachine(id, inputValues);
               
                setshowAlert(true);
                
           
                setTimeout(() => {
                    navigate(-1);
                    resetForm();
                    setshowAlert(false);
                }, 500);
            } else {
                setShowValidationAlert(true)
            }
        } else {
            if(inputValues.name) {
                setShowValidationAlert(false)
                addMachine({ id: uuid(), ...inputValues });
                setshowAlert(true);
                setTimeout(() => {
                    navigate(-1);
                    resetForm();
                    setshowAlert(false);
                }, 500);
            } else {
                setShowValidationAlert(true)
            }
        }
       
    };

    return (
        <div>
            {
                showAlert && (
                    <div className="px-5">
                        <div className="alert alert-success">
                            <strong>Gotowe!</strong> {id ? " Edytowano" : " Dodano"} maszynę.
                        </div>
                    </div>
                )
            }
            {
                showValidationAlert && (
                    <div className="px-5">
                        <div className="alert alert-danger">
                            <strong> uzupełnij brakujące pola </strong>
                        </div>
                    </div>
                )
            }
            <div className="d-flex my-3 mx-5 justify-content-between">
                <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>Wróć</button>
                <h2 className="text-center">{id ? "Edytuj" : "Dodaj nową"} maszynę</h2>
                <div />
            </div>

            <div className="card border-primary p-5 m-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid" >Nazwa</label>
                        <input
                            name="name"
                            type="text"
                            value={inputValues.name}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                            style={showValidationAlert ? {border: '1px solid red'} : {}}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Szczegóły</label>
                        <textarea
                            name="desc"
                            type="textarea"
                            value={inputValues.desc}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Data przeglądu</label>
                        <input
                            name="date"
                            type="date"
                            value={inputValues.date}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Następny przegląd</label>
                        <input
                            type="date"
                            min={inputValues.date}
                            name="nextDate"
                            value={inputValues.nextDate}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                        />
                    </div>

                    <div>
                        <br />
                        <input
                            type="checkbox"
                            name="customSwitch"
                            id="customSwitch"
                            checked={inputValues.customSwitch}
                            onChange={handleInputChange}
                        /> 
                        <label htmlFor="customSwitch" className="form-label mt-2 mx-2">
                            przypomnij 30 dni przed następnym przeglądem
                        </label>
                    </div>

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-outline-primary btn-block">{id ? "Edytuj" : "Dodaj"} maszynę</button>
                    </div>
                </form>
            </div>
        </div >
    );
};