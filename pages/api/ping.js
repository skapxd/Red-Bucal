import { generateImage } from '../../utils/imageUtils';

export default async (req, res) => {
    if (req.method === "GET") {
        
        res.status(200).json({
            status: "ok",
            message: "Servicio ping en linea",
        });
    } else {
        res.status(405).end();
    }
};
