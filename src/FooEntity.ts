import {Collection, Entity, OneToMany, PrimaryKey} from "mikro-orm";
import {BarEntity} from "./BarEntity";

@Entity()
export class FooEntity {
    @PrimaryKey()
    id!: number;

    @OneToMany(() => BarEntity, bar => bar.foo)
    bars = new Collection<BarEntity>(this);
}
