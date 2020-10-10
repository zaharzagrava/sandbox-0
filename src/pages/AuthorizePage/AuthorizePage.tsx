import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
interface Props {}

function AuthorizePage({}: Props): ReactElement {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            Authorization Page
          </li>
        </ol>
      </nav>
      <div className="container d-flex justify-content-center">
        <div className="p-2 bd-highlight">
          <NavLink to="/login"><button type="button" className="btn btn-primary">Login</button></NavLink>
        </div>
        <div className="p-2 bd-highlight">
          <NavLink to="/register"><button type="button" className="btn btn-primary">Register</button></NavLink>
        </div>
      </div>
    </>
  );
}

export default AuthorizePage;
