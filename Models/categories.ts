import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import { CategoryAttributes } from 'types/categories';

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id_tipo'>

// Define la clase del modelo
class Category extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes {
    public id_tipo!: number;
    public Detalle!: string;
    public status!: string;
}

// Inicializa el modelo
Category.init({
    id_tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Detalle: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(8),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Tipo',
    timestamps: false
});

export default Category;