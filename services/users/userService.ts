import UserRepository from "../../Repository/userRepository";

class UserService {
    protected userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async getUsers() {
        
        try {
            
            return await this.userRepository.getUsers()
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
            return await this.userRepository.getUserByEmail(email);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user by email: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting user by email');
            }
        }
    }

    async getUserById(id: number) {
        try {
            return await this.userRepository.getUserById(id);
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
            return await this.userRepository.checkExistingEmail(email);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while cheking email: ${error.message}`)
            } else {
                throw new Error(`An unknown error ocurred while xd`)
            }
        }
    }
}

export default UserService;