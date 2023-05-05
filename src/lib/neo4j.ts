import * as neo4j from 'neo4j-driver'
import {relation} from "@/data/types";

const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;
const NEO4J_USERNAME = process.env.NEO4J_USERNAME;
const NEO4J_URI = process.env.NEO4J_URI
const driver = neo4j.driver(
    NEO4J_URI!,
    neo4j.auth.basic(
        NEO4J_USERNAME!,
        NEO4J_PASSWORD!
    )
)
export async function createRelationship(entity1: string, entity2: string, relation: relation) {
    const session = driver.session();
    try {
        await session.run(
            `CREATE (object1:${relation.domain.name} {name: $entity1})-[:${relation.name}]->(object2:${relation.range.name} {name: $entity2})`,
            {entity1, entity2}
        );
    } finally {
        await session.close();
    }
}