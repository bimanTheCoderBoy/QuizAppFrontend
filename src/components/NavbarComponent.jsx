import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

const login = false;

const NavbarComponent = () => {
    return (
        <div className='container-fluid navbar-body'>
            <div className='row'>
                <div className='col-md-12 col-12 px-3 py-2'>
                    <h1 className='navbar-title display-4'>Quiz</h1>
                    {
                        login ? <NavLink to="/profile" className="profile-svg"><CgProfile /></NavLink> : <NavLink to="/login">
                            <AwesomeButton type='secondary'>Login</AwesomeButton></NavLink>
                    }
                </div>
            </div>
        </div>
    );
}

export default NavbarComponent;