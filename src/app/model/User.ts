import type { Role } from "./Role";

export class User {
    id: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    gender: string | undefined;
    phoneNumber: number | undefined;
    role: Role | undefined;
    token: string | undefined;
}