import RoleRepository from "../../Repository/roleRepository";
import { Role } from "../../Models/index";
class AuthUserService {

    private roleRepository: RoleRepository;

    constructor(roleRepository: RoleRepository) {
        this.roleRepository = roleRepository;
    }

    async confirmAccount(id: number): Promise<Role | null> {
        try {
            const user = await this.roleRepository.confirmEmailById(id);
            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while confirming account: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while confirming account');
            }
        }
    }
    
    async getUserRole(id: number): Promise<Role | null> {
        try {
            return await this.roleRepository.getUserRoleFromDb(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting user role: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting user role');
            }
        }
    }
    async getAdminRoleById(id: number): Promise<Role | null> {
        try {
            return await this.roleRepository.getAdminRoleFromDb(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting admin role: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting admin role');
            }
        }
    }
}
export default AuthUserService