
import { ProviderService, ProviderSaveService, ProviderUpdateService, ProviderDeleteService } from "../services/index";
import { Request, Response } from "express";
class ProviderController {
    protected providerService: ProviderService;
    protected providerSaveService: ProviderSaveService;
    protected providerUpdateService: ProviderUpdateService;
    protected providerDeleteService: ProviderDeleteService;

    constructor(
        providerService: ProviderService,
        providerSaveService: ProviderSaveService,
        providerUpdateService: ProviderUpdateService,
        providerDeleteService: ProviderDeleteService
    ) {
        this.providerService = providerService;
        this.providerSaveService = providerSaveService;
        this.providerUpdateService = providerUpdateService;
        this.providerDeleteService = providerDeleteService;
    }

    getProviders = async (req: Request, res: Response) => {

        try {
            const result = await this.providerService.getProviders();
            if (!result) {
                return res.status(404).json({ error: 'Providers not found' });
            }
            res.status(200).json({ providers: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error while getting providers' });
        }
    }

    getProvider = async (req: Request, res: Response) => {
        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        try {
            const result = await this.providerService.getProviderById(id);
            if (!result) {
                return res.status(404).json({ error: 'Provider not found' });
            }
            res.status(200).json({ provider: result.dataValues });

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    createProvider = async (req: Request, res: Response) => {
        const { sanitizedName, sanitizedDescription, sanitizedNumber, sanitizedEmail, sanitizedAddress, sanitizedSatus } = req.body;
        try {
            const result = await this.providerSaveService.save(sanitizedName, sanitizedDescription, sanitizedNumber, sanitizedEmail, sanitizedAddress, sanitizedSatus);
            if (!result) {
                return res.status(500).json({ error: 'Error while creating provider' });
            }
            res.status(200).json({ message: 'The provider has been created' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    updateProvider = async (req: Request, res: Response) => {
        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const { sanitizedName, sanitizedDescription, sanitizedNumber, sanitizedEmail, sanitizedAddress, sanitizedStatus } = req.body;
    
        try {
            const result = await this.providerUpdateService.update(id, sanitizedName, sanitizedDescription, sanitizedNumber, sanitizedEmail, sanitizedAddress, sanitizedStatus);
            if (!result) {
                res.status(500).json({ error: 'Error while updating provider' });
            }
            res.status(200).json({ message: 'The provider has been updated' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    deleteProvider = async (req: Request, res: Response) => {
         const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        try {
            const result = await this.providerDeleteService.delete(id);
            if (!result) {
                res.status(500).json({ error: 'Error while deleting provider' });
            }
            res.status(200).json({ message: 'The provider has been deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error while deleting provider' });
        }
    }
}
export default ProviderController;