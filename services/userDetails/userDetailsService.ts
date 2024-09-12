import UserDetailsRepository from "../../Repository/userDetailsRepository";

class UserDetailsService {
    protected userDetailsRepository: UserDetailsRepository;
    constructor(userDetailsRepository: UserDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    async getUserDetailsById(id: number) {
        try {
            return await this.userDetailsRepository.getUserDetailsById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user details: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting user details`);
            }
        }
    }

    async getUserOldImage(id: number) {
        try {
            return await this.userDetailsRepository.getUserOldImage(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user old image: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting user old image`);
            }
        }
    }

    async getUserPhoneById(id: number) {
        try {
            return await this.userDetailsRepository.getUserPhoneById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user phone: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting user phone`);
            }
        }
    }

    async updateUserDetails(id: number, Nombre: string, Apellido: string, Apellido2: string, correo: string, PhoneData: string, AddressData: string, fileName: string| null) {
        try {
            return await this.userDetailsRepository.updateUserDetails(id, Nombre, Apellido, Apellido2, correo, PhoneData, AddressData, fileName);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating user details: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating user details`);
            }
        }
    }

    async getUserAddressById(id: number) {
        try {
            return await this.userDetailsRepository.getUserAddressById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user address: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting user address`);
            }
        }
    }

    async savePhone(id: number, phone: string) {
        try {
            return await this.userDetailsRepository.savePhone(phone, id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while saving user phone: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while saving user phone`);
            }
        }
    }

    async saveAddress(id: number, address: string) {

        try {
            return await this.userDetailsRepository.saveAddress(id, address);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while saving user address: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while saving user address`);
            }
        }
    }

    async updatePhone(id: number, phone: string) {
        try {
            return await this.userDetailsRepository.updatePhone(id, phone);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating user phone ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating user phone`);
            }
        }
    }

    async updateAddress(id: number, address: string) {
        try {
            return await this.userDetailsRepository.updateAddress(id, address);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating user address ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating user address`);
            }
        }
    }

    async updatePassword(id: number, password: string) {
        try {
            return await this.userDetailsRepository.updatePassword(id, password);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating user password ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating user password`);
            }
        }
    }

    async deleteAccount(id: number) {
        try {
            return await this.userDetailsRepository.deleteAccount(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting user account ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while deleting user account`);
            }
        }
    }

}

export default UserDetailsService;