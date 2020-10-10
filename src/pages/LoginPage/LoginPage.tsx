import { Field, Form, Formik } from 'formik';
import React, { ReactElement } from 'react';
import { login } from '../../backendapi/rest';
import { LoginDT } from '../../types';

const initialValues: LoginDT = {
  email: '',
  client_password: '',
};

// interface Props {}

function LoginPage(): ReactElement {
  async function onSubmitLoginForm(values: LoginDT) {
    login(values);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmitLoginForm}
      >
        <Form>
          <div className="container">
            <div className="row py-2">
              <div className="col-md-12">
                <Field type="email" name="email" placeholder="Email Address" className="form-control"/>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-md-12">
                <Field type="password" name="client_password" placeholder="Password" className="form-control"/>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-md-12 d-flex justify-content-center p-2">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default LoginPage;
