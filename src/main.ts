import 'reflect-metadata';
import {MikroORM, ReflectMetadataProvider} from "mikro-orm";
import {FooEntity} from "./FooEntity";
import {BarEntity} from "./BarEntity";
import {BazEntity} from "./BazEntity";

async function run() {
    const orm = await MikroORM.init({
        entities: [FooEntity, BarEntity, BazEntity],
        dbName: 'test',
        type: 'mariadb',
        metadataProvider: ReflectMetadataProvider,
        cache: {enabled: false},
        // debug: true,
    });

    try {
        // ensure the database is up-to-date
        await orm.getSchemaGenerator().updateSchema();

        // create entities
        const fooEntity = orm.em.getRepository(FooEntity).create({});
        await orm.em.persistAndFlush(fooEntity);
        const bazEntity = orm.em.getRepository(BazEntity).create({});
        await orm.em.persistAndFlush(bazEntity);
        const barEntity = orm.em.getRepository(BarEntity).create({
            foo: fooEntity,
            baz: bazEntity,
        });
        await orm.em.persistAndFlush(barEntity);

        // findOne given the same query succeeds
        await orm.em.getRepository(FooEntity).findOneOrFail({
            id: fooEntity.id,
            bars: {
                baz: bazEntity,
            },
        });

        // delete entity via nested query conditions
        // throws an error; without nested condition it works without throwing
        await orm.em.getRepository(FooEntity).remove({
            id: fooEntity.id,
            bars: {
                baz: bazEntity,
            },
        });
        await orm.em.flush();
    } finally {
        await orm.close();
    }
}

run();
