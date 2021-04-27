import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity()
export class Product {
    @ObjectIdColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({length: 1000})
    description!: string;

    @Column()
    image!: string;

    @Column()
    price!: number;
}
