import axios from "axios";

type LoginRequest = {
	email: string;
	password: string;
};

type CreateUserDto = {
	name: string;
	email: string;
	password: string;
	cpf: string;
	role: RoleEnum;
};

export enum RoleEnum {
	SINDICO = "SINDICO",
	PORTEIRO = "PORTEIRO",
}

const base_url = "http://localhost:8081/auth";

export const login = async (params: LoginRequest) => {
	const response = await axios.post(`${base_url}/login`, params);
	return response;
};

export const createUser = async (params: CreateUserDto) => {
	const { data } = await axios.post(`${base_url}/create`, params);
	return data;
};

export const logout = async (userId: string) => {
	const { data } = await axios.post(`${base_url}/logout/${userId}`);
	return data;
};
