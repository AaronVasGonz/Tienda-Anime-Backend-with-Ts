import express from "express";

const routerReports = express.Router();

routerReports.get('/reports', (req, res) => {
    res.send('¡Hola, mundo!');
});

export default routerReports;