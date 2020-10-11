import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import { register } from '../../backendapi/rest';
import { RegisterDT } from '../../types/';
import * as yup from 'yup'; // for everything
import SandboxErrorMessage from '../SandboxErrorMessage/SandboxErrorMessage';

const initialValues: RegisterDT = {
  client_name: '',
  email: '',
  client_password: '',
};

const validationSchema = yup.object({
  client_name: yup.string().required('Required'),
  email: yup.string().email('Invalid Email').required('Required'),
  client_password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Requried'),
});

// interface Props {}

function RegisterPage(): ReactElement {
  const [serverError, setServerError] = useState('');

  async function onSubmitRegisterForm(values: RegisterDT) {
    try {
      await register(values);
    } catch (error) {
      if (error.response.data === 'client_name must be unique') {
        setServerError('This username is already taken');
      } else if (error.response.data === 'email must be unique') {
        setServerError('This email is already taken');
      } else {
        throw error;
      }
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitRegisterForm}
      >
        <Form>
          <div className="container">
            <div className="row py-2">
              <div className="col-md-12">
                <Field
                  type="text"
                  name="client_name"
                  placeholder="Full Name"
                  className="form-control"
                />
                <ErrorMessage
                  component={SandboxErrorMessage as React.FunctionComponent<{}>}
                  name="client_name"
                />
              </div>
            </div>
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
            <SandboxErrorMessage>{serverError}</SandboxErrorMessage>
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
