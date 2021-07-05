import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity("todos")
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column("varchar", { nullable: false })
    public name!: string;

    @Column("varchar", { nullable: true })
    public description!: string;

}