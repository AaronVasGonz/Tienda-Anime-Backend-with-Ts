
import {User,Role} from '../Models/index'

class SignUpRepository {
    async insertUser(nombre: string, apellido: string, apellido2: string, email: string, password: string) : Promise<{user: User, rol: Role} | null> {
        try {
            const user = await User.create({ nombre: nombre, apellido: apellido, apellido2: apellido2, correo: email, password: password });
            const rol = await this.defaultRole(user.id);
            return { user, rol };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while inserting user: ${error.message}`);
            }else{
                throw new Error('An unknown error occurred while inserting user');
            }
        }
    }

    async defaultRole(userId: number) {
        const status = "Inactivo";
        const Rol = "USER";
        try {
            return await Role.create({ id_usuario: userId, status: status, Rol: Rol });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while creating default role: ${error.message}`);
            }else{
                throw new Error('An unknown error occurred while creating default role');
            }
        }
    }
}

export default SignUpRepository;