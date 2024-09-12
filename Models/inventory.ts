import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import Product from './product';
import { InventoryAttributes } from 'types/inventory';

class Inventory extends Model<InventoryAttributes> implements InventoryAttributes {
    public id!: number;
    public id_producto!: number;
    public cantidad!: number;
}

Inventory.init({
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
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Inventario',
    timestamps: false
});

Inventory.belongsTo(Product, { foreignKey: 'id_producto', as: 'product' });

export default Inventory;