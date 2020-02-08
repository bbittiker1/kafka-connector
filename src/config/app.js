
export default {
    port: process.env.PORT,
    origin: process.env.ORIGIN,
    environment: process.env.NODE_ENV,
    database: process.env.DATABASE,
    databaseHost: process.env.DATABASE_HOST,
    databaseUser: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
    databaseDialect: process.env.DATABASE_DIALECT,
    databasePort: process.env.DATABASE_PORT,
    secret: process.env.secret
}

