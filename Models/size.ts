import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import { SizeAttributes } from 'types/sizes';

// Opcional: para atributos que pueden ser opcionales al crear una instancia
type SizeCreationAttributes = Optional<SizeAttributes, 'id'>

class Size extends Model<SizeAttributes, SizeCreationAttributes> implements SizeAttributes {
    public id!: number;
    public detalleTalla!: string;
    public detalleNum!: number;
}
// Inicializa el modelo
Size.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    detalleTalla: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    detalleNum: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Talla',
    timestamps: false
});

export default Size;