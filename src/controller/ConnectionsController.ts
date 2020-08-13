import { Request, Response} from 'express';
import db from '../database/conection';

export default class ConnectionsController {
    async index(request: Request, response: Response) {
        const totalConnections = await db('connections').count('* as total');

        const { total } = totalConnections[0];

        return response.json({total});
    }


    async create(request: Request, response: Response) {
        const {user_id} = request.body;

        try {
            await db('connections').insert({
                user_id,
            });
        } catch (err) {
            console.log(err);
            return response.status(400).json({
                error: 'erro ao conectar ao servidor.'
            })
        }

        return response.status(201).send();
    }
}