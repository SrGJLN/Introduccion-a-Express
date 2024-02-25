import { error } from 'console'
import fs from 'fs'

const getCanciones = (req, res) => {
    try {
        const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
        res.status(200).json(canciones)
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
    }
}

const postCanciones = (req, res) => {
    let cancion = {
        titulo: '',
        artista: '',
        tono: '',
    }
    cancion = req.body
    try {
        Object.keys(cancion).forEach((key) => {
            if (cancion[key] === '') {
                return res.status(400).json({ error: `Falta ingresa el siguiente campo ${key}` })
            }
        })
        const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
        canciones.push(cancion)
        fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
        res.status(201).send('cancion creada con exito')
    } catch (error) {
        res.status(500).json({ error: 'Recurso no disponible' })
    }
}

const putCanciones = (req, res) => {
    let cancion = {
        titulo: '',
        artista: '',
        tono: '',
    }
    cancion = req.body
    try {
        Object.keys(cancion).forEach((key) => {
            if (cancion[key] === '') {
                return res.status(400).json({ error: `Falta ingresa el siguiente campo ${key}` })
            }
        })
        const { id } = req.params
        
        const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
        const index = canciones.findIndex((c) => c.id === +id)
        console.log(index)
        if(index === -1){
        return res.status(404).json({ error:'cancion no encontrada' })
        }
        canciones[index] = cancion
        fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
        res.status(200).send('cancion actualizada con exito')
    } catch (error) {
        res.status(500).json({ error: 'Recurso no disponible' })
    }
}

const deleteCanciones = (req, res) => {
    try {
        const { id } = req.params
        const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
        const index = canciones.findIndex((c) => c.id === id)
        if(index === -1){
            return res.status(404).json({ error:'cancion no encontrada' })
            }
        canciones.splice(index, 1)
        fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
        res.status(200).send('cancion eliminada con exito')
    } catch (error) {
        res.status(500).json({ error: 'Recurso no disponible' })
    }
}

export { getCanciones, postCanciones, putCanciones, deleteCanciones }