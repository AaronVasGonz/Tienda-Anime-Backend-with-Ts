 import RoleRepository from "../../Repository/roleRepository";
 class RoleService {
    protected roleRepository: RoleRepository
     constructor(roleRepository: RoleRepository) {
         this.roleRepository = roleRepository
     }
 }
 export default RoleService;