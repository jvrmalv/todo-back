import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity("todos")
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column("varchar", { unique: true, nullable: false })
    public name!: string;

}