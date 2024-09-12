


class CountriesService {
    phoneCodes: unknown
    constructor(phoneCodes: unknown) {
        this.phoneCodes = phoneCodes
    }
    getCountries() {
        return this.phoneCodes;
    }
}

export default CountriesService;