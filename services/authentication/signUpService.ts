import SignUpRepository from "../../Repository/signUpRepository";
import User from "../../Models/user";
import Role from "../../Models/role";
class SignUpService {
    private signUpRepository: SignUpRepository;
    constructor(signUpRepository: SignUpRepository) {
        this.signUpRepository = signUpRepository;
    }
    async signUp(nombre: string, apellido: string, apellido2: string, email: string, password: string): Promise<{ user: User, rol: Role } | null> {
        try {
            return await this.signUpRepository.insertUser(nombre, apellido, apellido2, email, password);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while signing up: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while signing up');
            }
        }
    }
}
export default SignUpService;