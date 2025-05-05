import axios from "axios";

type LoginRequest = {
	email: string;
	password: string;
};

type LoginResponse = {
	access_token: string;
	expires_in: number;
	refresh_expires_in: number;
	refresh_token: string;
	token_type: string;
	not_before_policy: number;
	session_state: string;
	scope: string;
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

const api = axios.create({
	baseURL: "http://localhost:8081/auth",
	withCredentials: true,
});

export const login = async (params: LoginRequest) => {
	const { data } = await api.post<LoginResponse>("/login", params);
	return data;
};

export const createUser = async (params: CreateUserDto) => {
	const { data } = await api.post("/create", params);
	return data;
};

export const logout = async (userId: string) => {
	const { data } = await api.post(`/logout/${userId}`);
	return data;
};
