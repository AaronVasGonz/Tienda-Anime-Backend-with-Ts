import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import User from './user';
import { AddressAttributes } from 'types/addresses';
// Define la interfaz para los atributos del modelo

 type AddressCreationAttributes = Optional<AddressAttributes, 'id_direccion'>

// Define la clase del modelo
class Address extends Model<AddressAttributes, AddressCreationAttributes>
    implements AddressAttributes {
    public id_direccion!: number;
    public id_usuario!: number;
    public direccion?: string;
}

// Inicializa el modelo
Address.init({
    id_direccion: {
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
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'Direccion',
    timestamps: false
});

// Define la relación
Address.belongsTo(User, { foreignKey: 'id_usuario', as: 'user' });

export default Address;