// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef, @typescript-eslint/no-unused-vars
const pdfkit = require('pdfkit');
class ReportsController {
    
    getUserReports = async (req, res) => {
        try {
            const hola = "hola";
            if (!hola) {
                return res.status(404).json({ error: 'Reports not found' });
            }
            res.status(200).json({ reports: hola });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }
}

export default ReportsController;