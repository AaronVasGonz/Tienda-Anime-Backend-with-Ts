export interface UserAttributes {
    id: number;
    nombre: string;
    apellido: string;
    apellido2: string;
    correo: string;
    password: string;
    roles?: string[];
}

interface UserPhoneAttributes {
    id: number;
    id_usuario: number;
    Numero: string | null;
}
