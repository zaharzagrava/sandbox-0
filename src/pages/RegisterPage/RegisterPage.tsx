import { Field, Form, Formik } from 'formik';
import React, { ReactElement } from 'react';
import { register } from '../../backendapi/rest';
import { RegisterDT } from "../../types/";

const initialValues: RegisterDT = {
  client_name: '',
  email: '',
  client_password: '',
};

// interface Props {}

function RegisterPage(): ReactElement {
  async function onSubmitRegisterForm(values: RegisterDT) {
    register(values);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmitRegisterForm}
      >
        <Form>
          <div className="container">
            <div className="row py-2">
              <div className="col-md-12">
                <Field type="text" name="client_name" placeholder="Full Name" className="form-control"/>
              </div>
            </div>
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
                  Register
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default RegisterPage;
