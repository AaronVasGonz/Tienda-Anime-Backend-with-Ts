import CountriesService from '../services/countries/countriesService';
import { Request, Response } from 'express';
class CountriesController {
    protected countriesService: CountriesService;
    constructor(countriesService: CountriesService) {
        this.countriesService = countriesService;
    }

    getCountries = async (req: Request, res: Response) => {
        try {
            const phoneCodes = await this.countriesService.getCountries();
            if (!phoneCodes) {
                return res.status(404).json({ error: 'Countries not found' });
            }
            return res.status(200).json({ phoneCodes });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'Server error' });
            }
        }
    }
}
export default CountriesController;