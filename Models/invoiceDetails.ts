import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import Invoice from './invoice';
import Product from './product';
import { InvoiceDetailsAttributes } from 'types/invoices';

class InvoiceDetails extends Model<InvoiceDetailsAttributes> implements InvoiceDetailsAttributes {
    public id_detallefactura!: number;
    public id_factura!: number;
    public id_producto!: number;
    public cantidad!: number;
    public precio!: number;
}

InvoiceDetails.init({
    id_detallefactura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Invoice,
            key: 'id_factura'
        }
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
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Detalle_Factura',
    timestamps: false
});

InvoiceDetails.belongsTo(Invoice, { foreignKey: 'id_factura' });
InvoiceDetails.belongsTo(Product, { foreignKey: 'id_producto' });

export default InvoiceDetails;