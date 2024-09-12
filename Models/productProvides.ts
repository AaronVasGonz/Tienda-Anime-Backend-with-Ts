import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import Provider from './provider';
import Product from './product';
import { ProductProvidesAttributes } from 'types/productProvides';

class ProductProvides extends Model<ProductProvidesAttributes> {
    public id_producto!: number;
    public id_proovedor!: number;
}

ProductProvides.init({
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Product,
            key: 'id'
        }
    },

    id_proovedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Provider,
            key: 'id'
        }
    }
}, {
    sequelize,
    tableName: 'Producto_Proovedor',
    timestamps: false
});

ProductProvides.belongsTo(Provider, { foreignKey: 'id_proovedor' });
ProductProvides.belongsTo(Product, { foreignKey: 'id_producto' });

export default ProductProvides;