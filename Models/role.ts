import { Model, DataTypes, Optional} from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import User from './user'; 
import { RoleAttributes } from 'types/roles';

type RoleCreationAttributes = Optional<RoleAttributes, 'id_rol'>;

class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    public id_rol!: number;
    public id_usuario!: number;
    public status!: string;
    public Rol?: string;
}
// Inicializa el modelo
Role.init({
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    Rol: {
        type: DataTypes.STRING(11),
    }
}, {
    sequelize,
    tableName: 'Rol',
    timestamps: false
});

export default Role;