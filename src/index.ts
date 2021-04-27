import express from 'express'
import {Request, Response} from 'express'
import cors from 'cors'

import {createConnection, Like} from 'typeorm'
import {Product} from "./entity/product"


createConnection().then(db => {
    const productRepository = db.getMongoRepository(Product);

    const app = express()

    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }))

    app.use(express.json())

    app.get('/api/products/frontend', async (req: Request, res: Response) => {
        const products = await productRepository.find()
        res.json(products)
    });


    app.get('/api/products/backend', async (req: Request, res: Response) => {
        let options = {}

        if (req.query.s) {
            options = {
                ...options,
                where: {
                    $or: [
                        {title: new RegExp(req.query.s.toString(), 'i')},
                        {description: new RegExp(req.query.s.toString(), 'i')},
                    ]
                }
            }
        }

        if (req.query.sort) {
            options = {
                ...options,
                order: {
                    price: req.query.sort.toString().toUpperCase()
                }
            }
        }

        const page: number = parseInt(req.query.page as any) || 1;
        const take = 9;
        const total = await productRepository.count();

        const data = await productRepository.find({
            ...options,
            take,
            skip: (page - 1) * take
        });

        res.json({
            data,
            total,
            page,
            last_page: Math.ceil(total / take)
        })
    });

    console.log('Listening to port: 8000')
    app.listen(8000);
});
