import { Router } from "express";
import {getCanciones, postCanciones, putCanciones, deleteCanciones} from '../src/controllers/cancionesControllers.js'

const router = Router()

router.get('/canciones', getCanciones)
router.post('/canciones', postCanciones)
router.put('/canciones/:id', putCanciones)
router.delete('/canciones/:id', deleteCanciones)

export default router;