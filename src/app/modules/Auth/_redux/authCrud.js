import axios from "axios";

export const LOGIN_URL = process.env.REACT_APP_API_URL + "/usuarios/login";
export const REGISTER_URL = process.env.REACT_APP_API_URL + "/auth/register";
export const REQUEST_PASSWORD_URL = process.env.REACT_APP_API_URL + "/auth/forgot-password";

export const ME_URL = process.env.REACT_APP_API_URL + "/me";

export function login(email, password) {

	var data = new FormData();
	const dados = {
        email: email,
        password: password,
        notifications_id: 'painel',
	};

	data.append('dados', JSON.stringify(dados));

  return axios.post(LOGIN_URL, data);
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
