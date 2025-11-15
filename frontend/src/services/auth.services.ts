import { PublicApiClient } from "./api.config";

export const LoginService = (payload: { tenant: string, email: string, password: string }) => PublicApiClient.post('/auth/login', payload);