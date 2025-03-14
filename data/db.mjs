import pg from 'pg';

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
};

(async () => {
    const client = new pg.Client(config);
    try {
        await client.connect();
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Database connection error:", error.message);
    } finally {
        await client.end();
    }
})();

async function create(statement, ...values) {
    return await runQuery(statement, ...values);
}

async function update(statement, ...values) {
    return await runQuery(statement, ...values);
}

async function read(statement, ...values) {
    return await runQuery(statement, ...values);
}

async function purge(statement, ...values) {
    return await runQuery(statement, ...values);
}

async function runQuery(query, ...values) {
    const client = new pg.Client(config);
    try {
        await client.connect();
        //console.log("Executing query:", query);
        //console.log("With values:", values);

        const result = await client.query(query, values);
        //console.log("Create Query Result:", result);
        return result.rows;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    } finally {
        await client.end();
    }
}




const DbManager = {create, update, read, purge};

export default DbManager;