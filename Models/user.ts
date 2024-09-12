import { Model, DataTypes, Optional} from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import { UserAttributes } from 'types/users';

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public apellido2!: string;
    public correo!: string;
    public password!: string;
} 
// Inicializa el modelo
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido2: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'usuario',
    timestamps: false
});

export default User;