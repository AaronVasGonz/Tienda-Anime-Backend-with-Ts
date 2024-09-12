import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import Collection from './collection';
import Category from './categories';
import { ProductAttributes } from 'types/products';

class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!: number;
    public Nombre_producto!: string;
    public Descripcion_Producto!: string;
    public Precio_Produtos!: number;
    public id_coleccion!: number;
    public id_tipo!: number;
    public status!: string;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre_producto: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    Descripcion_Producto: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Precio_Produtos: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    id_coleccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Collection,
            key: 'id'
        }
    },
    id_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id_tipo'
        }
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'Activo'
    },
}, {
    sequelize,
    tableName: 'Producto',
    timestamps: false,
});

Product.belongsTo(Collection, { foreignKey: 'id_coleccion', as: 'coleccion' });
Product.belongsTo(Category, { foreignKey: 'id_tipo', as: 'tipo' });

export default Product;