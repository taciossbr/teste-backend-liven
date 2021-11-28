import knex from "knex";

import knexSettings from "../../knexfile"

// @ts-ignore
const config = knexSettings[process.env.NODE_ENV || 'development'] 

const connection = knex(config)

export default connection