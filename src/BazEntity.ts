import {Collection, Entity, OneToMany, PrimaryKey} from "mikro-orm";
import {BarEntity} from "./BarEntity";

@Entity()
export class BazEntity {
    @PrimaryKey()
    id!: number;

    @OneToMany({
        entity: () => BarEntity,
        mappedBy: bar => bar.baz,
        hidden: true,
    })
    bars = new Collection<BarEntity>(this);
}
