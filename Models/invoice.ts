import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import User from './user';
import { InvoiceAttributes } from 'types/invoices';

class Invoice extends Model<InvoiceAttributes> implements InvoiceAttributes {
    public id_factura!: number;
    public id_usuario!: number;
    public titular!: string;
    public cedula!: number | string;
    public direccion_pago!: string;
    public fecha!: Date;
    public total!: number;
    public status!: string;
}

Invoice.init({
    id_factura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    titular: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cedula: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    direccion_pago: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Factura',
    timestamps: false
});

Invoice.belongsTo(User, { foreignKey: 'id_usuario' });

export default Invoice;