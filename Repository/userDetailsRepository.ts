import { QueryTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import { User, Phone, Address, Role } from '../Models/index';
import StorageService from '../services/storageService';
interface UpdateUserDetailsResult {
    success: number;
}

class UserDetailsRepository {
    private storageService: StorageService;
    constructor(storageService: StorageService) {
        this.storageService = storageService;
    }

    async getUserDetailsById(id: number) {

        try {
            const results = await sequelize.query(
                'SELECT * FROM DetalleUsuario WHERE id_Usuario = :id LIMIT 1',
                {
                    replacements: { id: id },
                    type: QueryTypes.SELECT
                }
            );
            return results;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user details: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting user details`);
            }
        }
    }

    async getUserPhoneById(id: number) {
        try {
            return await Phone.findAll({ where: { id_usuario: id } });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user phone: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting user phone`);
            }
        }
    }

    async getUserAddressById(id: number) {
        try {
            return await Address.findAll({ where: { id_usuario: id } });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user address: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting user address`);
            }
        }
    }


    async updateUserDetails(id: number, Nombre: string, Apellido: string, Apellido2: string, correo: string, PhoneData: string, AddressData: string, fileName: string | null) {
        try {
            // Update the user details in the database
            await sequelize.query(
                'CALL UpdateUserDetails(?, ?, ?, ?, ?, ?, ?, ?, @success)',
                {
                    replacements: [id, Nombre, Apellido, Apellido2, correo, PhoneData, AddressData, fileName],
                    type: QueryTypes.RAW
                }
            );

            //Get the value of @success
            const [results] = await sequelize.query<UpdateUserDetailsResult>(
                'SELECT @success AS success',
                {
                    type: QueryTypes.SELECT
                }
            );

            const success = results.success;

            return success === 1;

        } catch (error: unknown) {
            if (error instanceof Error) {
                this.storageService.deleteFileFromFirebase(fileName, 'avatar');
                throw new Error(`Error while updating user details: ${error.message}`);

            } else {
                this.storageService.deleteFileFromFirebase(fileName, 'avatar');

                throw new Error(`An unknown error occurred while updating user details`);

            }
        }
    }

    async savePhone(phone: string, userId: number) {
        try {
            return await Phone.create({ id_usuario: userId, Numero: phone });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while saving user phone: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while saving user phone`);
            }
        }
    }



    async updatePhone(id: number, phone: string) {
        try {
            return await Phone.update({ Numero: phone }, { where: { id_usuario: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating user phone: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating user phone`);
            }
        }
    }

    async saveAddress(id: number, address: string) {

        try {
            return await Address.create({ id_usuario: id, direccion: address });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while saving user address: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while saving user address`);
            }
        }
    }

    async updateAddress(id: number, address: string) {
        try {
            return await Address.update({ direccion: address }, { where: { id_usuario: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating user address: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating user address`);
            }
        }
    }

    async getUserOldImage(id: number): Promise<{ Imagen: string }[]> {
        try {
            const results = await sequelize.query<{ Imagen: string }>(


                'SELECT Imagen FROM DetalleUsuario WHERE id_Usuario = :id',
                {
                    replacements: { id: id },
                    type: QueryTypes.SELECT
                }
            );
            return results;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user old image: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting user old image`);
            }
        }
    }

    async updatePassword(id: number, password: string) {
        try {
            return await User.update({ password: password }, { where: { id: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating user password: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating user password`);
            }
        }
    }

    async deleteAccount(id: number) {
        try {
            return await Role.update({ status: 'Inactivo' }, { where: { id_usuario: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting user account: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while deleting user account`);
            }
        }
    }
}

export default UserDetailsRepository;
