export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

export interface JwtPayload {
    id: string;
}