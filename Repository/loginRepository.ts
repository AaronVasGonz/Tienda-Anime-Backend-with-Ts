import { UserService } from '../services/index';  
import LoginRoleRepository from './roleLoginRepository';
class LoginRepository {
    private userService: UserService;
    private loginRoleRepository: LoginRoleRepository;

    constructor(userService: UserService, loginRoleRepository: LoginRoleRepository) {
        this.userService = userService;
        this.loginRoleRepository = loginRoleRepository;
    }

    async verifyUser(email: string): Promise<string> {
        try {
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }

            const role = await this.loginRoleRepository.getLoginRole(user.dataValues.id);

            if (!role) {
                throw new Error("User role not found");
            }

            return role.dataValues.status;
        } catch (error) {
            console.error("Error verifying user:", error);
            throw error;
        }
    }
}

export default LoginRepository;