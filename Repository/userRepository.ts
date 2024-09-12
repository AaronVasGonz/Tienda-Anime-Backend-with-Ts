// UserRepository.js

import { User } from '../Models/index';
import sequelize from '../config/sequelizeConfig';
import { QueryTypes } from 'sequelize';
import RoleRepository from './roleRepository';
import { UserAttributes } from 'types/users';

interface UserWithRoles extends UserAttributes {
    roles: string[];
}

class UserRepository {
    private roleRepository: RoleRepository;

    constructor(roleRepository: RoleRepository) {
        this.roleRepository = roleRepository;
    }

    async getUsers() {
        try {
            const query = `
              SELECT 
                    usuario.id, 
                    usuario.nombre, 
                    usuario.correo,
                    CASE 
                        WHEN EXISTS (
                            SELECT 1 
                            FROM Rol 
                            WHERE Rol.id_usuario = usuario.id 
                            AND Rol.status = 'Activo'
                        ) THEN 'Activo'
                        ELSE 'Inactivo'
                    END AS status,
                    CASE
                        WHEN EXISTS (
                            SELECT 1
                            FROM Rol
                            WHERE Rol.id_usuario = usuario.id
                            AND Rol.status = 'Activo'
                            AND Rol.Rol = 'ADMIN'
                        ) THEN 'ADMIN'
                        ELSE 'USER'
                    END AS Rol
                FROM usuario
            `;

            const users = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                raw: true
            });

            return users;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting users: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting users');
            }
        }
    }


    async getUserByEmail(email: string) {
        try {
            const user = await User.findOne({
                where: { correo: email },
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user by email: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting user by email');
            }
        }
    }

    async getUserById(id: number): Promise<UserWithRoles> {
        try {
            const user = await User.findOne({
                attributes: ['id', 'Nombre', 'Apellido', 'Apellido2', 'correo', 'password'],
                where: { id: id },
                raw: true
            });
            if (!user) {
                throw new Error('User not found');
            }
            const roles = await this.roleRepository.getRoles(id);


            const userWithRoles: UserWithRoles = {
                ...user,
                roles: roles.map(role => role.Rol).filter((role): role is string => role !== undefined)
            };

            return userWithRoles;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user by id: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting user by id');
            }
        }
    }

    async checkExistingEmail(email: string) {
        try {
            const user = await User.findOne({
                where: { correo: email },
                raw: true
            });
            console.log(user);
            const exists = !!user;
            return {
                exists,
                message: exists ? 'User already exists' : null
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while checking existing email: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while checking existing email');
            }
        }
    }

    async updateUser(id: number, nombre: string, apellido: string, apellido2: string, email: string, roles: string[]) {

        try {
            const updated = await sequelize.query(
                'UPDATE Usuario SET Nombre = :nombre, Apellido = :apellido, Apellido2 = :apellido2, correo = :email WHERE id = :id',
                { replacements: { id, nombre, apellido, apellido2, email } }
            )

            if ((updated as number[])[0] === 0) {

                return false;
            }
            if (roles) {
                await this.roleRepository.deleteRolesByUserId(id);
                await this.roleRepository.insertRolAdmin(id, roles);
            } else {
                console.log("No hay roles para actualizar");
            }
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating user: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while updating  user');
            }
        }
    }

    async deleteUserAdmin(id: number) {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                console.log("Error al inactivar usuario: el usuario no fue encontrado");
                return false;
            }
            await this.roleRepository.inactiveUserById(id);
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting user: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while deleting user');
            }
        }
    }

    async insertUserAdmin(nombre: string, apellido: string, apellido2: string, email: string, password: string, roles: string[]) {
        try {
            const userId = Math.floor(Math.random() * 1000000);
            const user = await User.create({ id: userId, nombre: nombre, apellido: apellido, apellido2: apellido2, correo: email, password: password });
            if (userId) {
                const roleInserted = await this.roleRepository.insertRolAdmin(userId, roles);
                if (!roleInserted) {
                    console.error('Error while inserting roles');
                }
            }
            return user;
        } catch (error) {
            console.error('Error while inserting user:', error);
            throw error;
        }
    }
}
export default UserRepository;