import {createConnection} from "typeorm";
import {Product} from "../src/entity/product";
import faker from 'faker';

createConnection().then(async (db) => {
    const productRepository = db.getMongoRepository(Product);

    for (let i = 0; i < 30; i++) {
        await productRepository.save({
            title: faker.lorem.words(2),
            description: faker.lorem.words(10),
            image: faker.image.imageUrl(),
            price: faker.datatype.number(100)
        });
    }

    process.exit();
});


