
import express from 'express';
const routerCountries = express.Router();
routerCountries.use(express.json());
import phoneCodes from '../Repository/phoneCodes';
import { CountryService } from '../services/index';

//services
const countryService = new CountryService(phoneCodes);

//controllers
import CountriesController from '../controllers/countriesController';
const countriesController = new CountriesController(countryService);

routerCountries.get('/countries', countriesController.getCountries);

export default routerCountries;