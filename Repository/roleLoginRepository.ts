import RoleRepository from "./roleRepository";
import { Role } from "../Models/index";

export interface UserRoles {
    roleUser: string;
    roleAdmin: string;
}

class LoginRoleRepository extends RoleRepository {

    constructor() {
        super();
    }

    async getUserRoles(userId: number): Promise<UserRoles> {
        let roleUser: string = 'USER';
        let roleAdmin: string = '';

        try {
            const userRoles = await Role.findAll({ where: { id_usuario: userId } });

            if (userRoles.length > 0) {
                roleUser = userRoles[0].Rol ?? 'USER';
            }
            if (userRoles.length > 1) {
                roleAdmin = userRoles[1].Rol ?? '';
            }

            return { roleUser, roleAdmin };

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user roles: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting user roles');
            }
        }
    }

    async getLoginRole(id: number) {
        try {
            return await Role.findOne({ where: { id_usuario: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting login role: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting login role');
            }
        }
    }
}

export default LoginRoleRepository;