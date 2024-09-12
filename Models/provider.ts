import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import { ProviderAttributes } from 'types/provider';

type ProviderCreationAttributes = Optional<ProviderAttributes, 'id'>;

class Provider extends Model<ProviderAttributes, ProviderCreationAttributes>  {
    public id!: number;
    public Nombre_Proovedor!: string;
    public Descripcion!: string;
    public Numero_Proovedor!: string;
    public Direccion_Proovedor!: string;
    public status_Proovedor!: string;
    public correo!: string;
}
Provider.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre_Proovedor: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    Descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    Numero_Proovedor: {
        type: DataTypes.STRING(20),
        allowNull: true
    },

    Direccion_Proovedor: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    status_Proovedor: {
        type: DataTypes.STRING(8),
        allowNull: false
    },

    correo: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
},{
    sequelize,
    timestamps: false,
    tableName: 'Proovedor'
});

export default Provider;

