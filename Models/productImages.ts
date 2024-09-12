import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import Product from './product';
import { ProductImagesAttributes } from 'types/products';

class ProductImages extends Model<ProductImagesAttributes> implements ProductImagesAttributes {
    public id!: number;
    public id_producto!: number;
    public imagen!: string;
}

ProductImages.init({
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
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Imagen',
    timestamps: false
});

ProductImages.belongsTo(Product, { foreignKey: 'id_producto', as: 'Product' });

export default ProductImages;