
import LoginRepository from "../../Repository/loginRepository";
import LoginRoleRepository from "../../Repository/roleLoginRepository";
import { UserRoles } from "../../Repository/roleLoginRepository";
class LoginService {
    private loginRepository: LoginRepository;
    private loginRoleRepository: LoginRoleRepository;
    constructor(loginRepository: LoginRepository, loginRoleRepository: LoginRoleRepository) {
        this.loginRepository = loginRepository;
        this.loginRoleRepository = loginRoleRepository;
    }

    async verifyUser(email: string): Promise<string | null> {
        try {
            return await this.loginRepository.verifyUser(email);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while verifying user: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while verifying user');
            }
        }
    }

    async getUserRoles(userId: number): Promise<UserRoles | null> {
        try {
            return await this.loginRoleRepository.getUserRoles(userId);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user roles: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting user roles');
            }
        }
    }
}

export default LoginService;