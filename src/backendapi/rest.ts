import axios from 'axios';
import { RegisterDT, LoginDT } from '../types';
import { firebase } from "../backendapi/firebase";

const backendURL = 'http://localhost:4000';
const signupRoute =
  process.env.NODE_ENV === 'production' ? `/signup` : `${backendURL}/signup`;

export async function register(values: RegisterDT) {
  console.log('@values')
  console.log(values)
  await firebase.auth().createUserWithEmailAndPassword(values.email, values.client_password).catch(function(error) {
    console.log('@rest/register')
    throw error
  });

  axios.post(signupRoute, {
    client_name: values.client_name,
    email: values.email,
    client_password: values.client_password,
  });
}

export async function login(values: LoginDT) {
  await firebase.auth().signInWithEmailAndPassword(values.email, values.client_password).catch(function(error) {
    console.log('@rest/login')
    throw error
  });
}
