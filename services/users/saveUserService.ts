import UserRepository from "../../Repository/userRepository";

class UserSaveService {
    protected userRepository: UserRepository
    constructor(userRepository: UserRepository ) {
        this.userRepository = userRepository;
    }

    async save(nombre: string, apellido: string, apellido2: string, email: string, password: string, roles: string[]) {
        try {
            return await this.userRepository.insertUserAdmin(nombre, apellido, apellido2, email, password, roles);
        } catch (error:unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while saving user: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while saving user');
            }
        }
    }
}

export default UserSaveService;