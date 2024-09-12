
import UserRepository from "../../Repository/userRepository";

class UserDeleteService {
    protected userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async delete(id: number) {
        try {
            return await this.userRepository.deleteUserAdmin(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting user: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while deleting user');
            }
        }
    }
}

export default UserDeleteService;