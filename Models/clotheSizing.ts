import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import ClotheInventory from './clotheInventory';
import Size from './size';
import { ClotheSizingAttributes } from 'types/sizes';

// Define la clase del modelo
class ClotheSizing extends Model<ClotheSizingAttributes> implements ClotheSizingAttributes {
    public id_Inventario!: number;
    public id_talla!: number;
}

// Inicializa el modelo
ClotheSizing.init({
    id_Inventario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: ClotheInventory,
            key: 'id'
        }
    },
    id_talla: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Size,
            key: 'id'
        }
    }
}, {
    sequelize,
    tableName: 'Inventario_Ropa_Talla',
    timestamps: false
});

// Configura las asociaciones
ClotheSizing.belongsTo(ClotheInventory, { foreignKey: 'id_Inventario' });
ClotheSizing.belongsTo(Size, { foreignKey: 'id_talla' });

export default ClotheSizing;