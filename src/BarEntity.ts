import {Entity, ManyToOne, PrimaryKey} from "mikro-orm";
import {FooEntity} from "./FooEntity";
import {BazEntity} from "./BazEntity";

@Entity()
export class BarEntity {
    @PrimaryKey()
    id!: number;

    @ManyToOne({
        entity: () => BazEntity,
        onDelete: 'cascade',
        onUpdateIntegrity: 'cascade',
        inversedBy: baz => baz.bars,
        eager: true,
    })
    readonly baz!: BazEntity;

    @ManyToOne({
        entity: () => FooEntity,
        onDelete: 'cascade',
        onUpdateIntegrity: 'cascade',
        inversedBy: foo => foo.bars,
        eager: true,
    })
    readonly foo!: FooEntity;
}
