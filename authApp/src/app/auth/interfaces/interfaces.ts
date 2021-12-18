export interface AuthReponse {
    ok: boolean;
    uid?: string;
    nombre?: string;
    token?: string;
    message?: string;
    email?: string;
}

export interface Usuario {
    uid: string;
    nombre: string;
    email?: string;
}