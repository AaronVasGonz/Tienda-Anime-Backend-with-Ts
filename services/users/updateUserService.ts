import UserRepository from "../../Repository/userRepository";

class UserUpdateService {
    protected userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async update(id: number, nombre: string, apellido: string, apellido2:string, email: string, roles:string[]) {
        try {
            return await this.userRepository.updateUser(id, nombre, apellido, apellido2, email, roles);
        } catch (error:unknown) {
            if(error instanceof Error){
                throw new Error(`Error while updating user ${error.message}`)
            }else{
                throw new Error(`An unknown error ocurred while updating user`)
            }
        }
    }
}

export default UserUpdateService;