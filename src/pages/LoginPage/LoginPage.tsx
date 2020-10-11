import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { ReactElement } from 'react';
import { login } from '../../backendapi/rest';
import { LoginDT } from '../../types';
import * as yup from 'yup'; // for everything
import SandboxErrorMessage from '../SandboxErrorMessage/SandboxErrorMessage';

const initialValues: LoginDT = {
  email: '',
  client_password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Required'),
  client_password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long'),
});

// interface Props {}

function LoginPage(): ReactElement {
  async function onSubmitLoginForm(values: LoginDT) {
    login(values);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitLoginForm}
      >
        <Form>
          <div className="container">
            <div className="row py-2">
              <div className="col-md-12">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="form-control"
                />
                <ErrorMessage
                  component={SandboxErrorMessage as React.FunctionComponent<{}>}
                  name="email"
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-md-12">
                <Field
                  type="password"
                  name="client_password"
                  placeholder="Password"
                  className="form-control"
                />
                <ErrorMessage
                  component={SandboxErrorMessage as React.FunctionComponent<{}>}
                  name="client_password"
                />
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
