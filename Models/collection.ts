import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';


interface CollectionAttributes {
    id: number;
    Nombre_Coleccion: string;
    Descripcion: string;
    status: string;
    imagen: string|null;
}

type CollectionCreationAttributes = Optional<CollectionAttributes, 'id'>

class Collection extends Model<CollectionAttributes, CollectionCreationAttributes> implements CollectionAttributes {
    public id!: number;
    public Nombre_Coleccion!: string;
    public Descripcion!: string;
    public status!: string;
    public imagen!: string;

}

Collection.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Nombre_Coleccion: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        Descripcion: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(8),
            allowNull: false
        },
        imagen: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'Coleccion',
        timestamps: false
    }
);

export default Collection;