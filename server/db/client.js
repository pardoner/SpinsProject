const { Client } = require('pg');

const dbName = "spins"
const client = new Client(`postgres://spins_user:LcSPNVOOZ5wTNc3uW38cwUXWVmtfRdds@dpg-cmru1hocmk4c7383huu0-a/${dbName}`)

module.exports = client;
