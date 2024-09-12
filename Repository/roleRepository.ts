// RoleRepository.js

import { Role } from '../Models/index';

class RoleRepository {
    async getRoles(id: number): Promise<Role[]> {
        try {
            return await Role.findAll({ where: { id_usuario: id }, raw: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting roles: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting roles');
            }
        }
    }

    async getAdminRoleFromDb(id: number): Promise<Role | null> {
        try {
            return await Role.findOne({ where: { id_usuario: id, Rol: 'ADMIN' }, raw: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting role: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting role');
            }
        }
    }

    async getUserRoleFromDb(id: number): Promise<Role | null> {
        try {

            return await Role.findOne({ where: { id_usuario: id, Rol: 'USER' }, raw: true });

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting role: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting role');
            }
        }
    }

    async insertRolAdmin(idUser: number, roles: string[]): Promise<boolean> {
        try {
            const rolesToInsert = Array.isArray(roles) && roles.length > 0 ? ['USER', ...roles] : ['USER'];
            await Promise.all(rolesToInsert.map(rol =>
                Role.create({ id_usuario: idUser, status: 'Activo', Rol: rol })
            ));
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while inserting roles: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while inserting roles');
            }
        }
    }

    async confirmEmailById(id: number): Promise<Role | null> {
        try {
            const [affectedCount] = await Role.update(
                { status: 'Activo' },
                { where: { id_usuario: id } }
            );

            if (affectedCount > 0) {
                return await Role.findOne({ where: { id_usuario: id } });
            }

            return null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while confirming email: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while confirming email');
            }
        }
    }

    async inactiveUserById(id: number): Promise<Role | null> {
        try {
            const [affectedCount] = await Role.update({ status: 'Inactivo' }, { where: { id_usuario: id } });
            if (affectedCount > 0) {
                return await Role.findOne({ where: { id_usuario: id } });
            }
            return null;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating role status: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while updating role status');
            }
        }
    }

    async deleteRolesByUserId(id: number): Promise<number> {
        try {
            return await Role.destroy({ where: { id_usuario: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting roles: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while deleting roles');
            }
        }
    }
}

export default RoleRepository;
