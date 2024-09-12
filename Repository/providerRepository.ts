
import { Provider } from '../Models/index';

class providerRepository {
    async getProviders() {
        try {
            return await Provider.findAll({ attributes: ['id', 'Nombre_Proovedor', 'Numero_Proovedor', 'Direccion_Proovedor', 'correo', 'status_Proovedor'] });
        } catch (error) {
            console.log(error);
        }
    }

    async getProviderById(id: number) {
        try {
            return await Provider.findOne({ where: { id: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting provider by id: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting provider by id`);
            }
        }
    }

    async saveProvider(name: string, description: string, number: string, email: string, address: string, status: string) {
        try {
            return await Provider.create({ Nombre_Proovedor: name, Descripcion: description, Numero_Proovedor: number, Direccion_Proovedor: address, correo: email, status_Proovedor: status });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while saving provider: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while saving provider`);
            }
        }
    }


    async updateProvider(id: number, name: string, description: string, number: string, email: string, address: string, status: string) {
        try {
            return await Provider.update({ Nombre_Proovedor: name, Descripcion: description, Numero_Proovedor: number, Direccion_Proovedor: address, correo: email, status_Proovedor: status }, { where: { id: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating provider: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating provider`);
            }
        }
    }

    async deleteProvider(id: number) {
        try {
            return await Provider.update({ status_Proovedor: 'Inactivo' }, { where: { id: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting provider: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while deleting provider`);
            }
        }
    }
}

export default providerRepository;