import knex from "knex";

import knexSettings from "../../knexfile"

const config = knexSettings.development

const connection = knex(config)

export default connection