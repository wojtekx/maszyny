import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#!">Lista maszyn</a>
                    <div className="" id="navbarColor03">
                        <ul className="navbar-nav me-auto">

                        </ul>

                        <button
                            className="btn btn-outline-secondary my-2 my-sm-0"
                            onClick={() => navigate("/maszyny/create-machine")}
                        >
                            Dodaj
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
