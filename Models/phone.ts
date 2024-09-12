import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import User from './user';
import { UserPhoneAttributes } from 'types/users';


type PhoneCreationAttributes = Optional<UserPhoneAttributes, 'id'>;

class Phone extends Model<UserPhoneAttributes, PhoneCreationAttributes> implements UserPhoneAttributes {
    public id!: number;
    public id_usuario!: number;
    public Numero!: string | null;
}

Phone.init({
    id: {
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
    Numero: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'Telefono',
    timestamps: false
});

Phone.belongsTo(User, { foreignKey: 'id_usuario', as: 'user' });

export default Phone;