import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import User from './user';
import Product from './product';
import { ValorationAttributes } from 'types/valorations';

type ValorationCreationAttributes = Optional<ValorationAttributes, 'id_valoracion'>

class Valoration extends Model<ValorationAttributes, ValorationCreationAttributes> {
    public id_valoracion!: number;
    public id_usuario!: number;
    public id_producto!: number;
    public puntuacion!: number;
    public comentarios!: string;
}

Valoration.init({
    id_valoracion: {
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
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
},{
    sequelize,
    tableName: 'Valoracion',
    timestamps: false
});
// Relationship
Valoration.belongsTo(User, { foreignKey: 'id_usuario', as: 'user' });
Valoration.belongsTo(Product, { foreignKey: 'id_producto', as: 'product' });

export default Valoration;