import { Router, Request, Response } from "express";
import bodyParser from 'body-parser';

export const router = Router();

router.get('/mensajes', (req: Request, res: Response) =>{
    res.json({
        ok:true,
        mensaje:'Todo esta bien C:'
    }); 
});
 router.post('/mensajes', (req:Request, res:Response)=>{
    const cuerpo = req.body.cuerpo
    const de = req.body.de

    res.json({
        ok:true,
        cuerpo,
        de
    });
 });
 export default router;