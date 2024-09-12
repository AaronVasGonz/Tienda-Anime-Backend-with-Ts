import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import Product from './product';
import { ClotheInventoryAttributes } from 'types/inventory';
// Define la interfaz para las propiedades de creación
type ClotheInventoryCreationAttributes = Optional<ClotheInventoryAttributes, 'id'>

class ClotheInventory extends Model<ClotheInventoryAttributes, ClotheInventoryCreationAttributes>
    implements ClotheInventoryAttributes {
    public id!: number;
    public id_producto!: number;
    public Cantidad!: number;
    public Genero!: string;
}

// Inicializa el modelo
ClotheInventory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Genero: {
        type: DataTypes.STRING(6),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Inventario_Ropa',
    timestamps: false
});

// Configura las asociaciones
ClotheInventory.belongsTo(Product, { foreignKey: 'id_producto', as: 'product' });

export default ClotheInventory;