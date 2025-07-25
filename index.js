const { Client } = require("pg");
const fs = require("fs");

const connectionString = process.env.DATABASE_URL;

const client = new Client({ connectionString });

(async () => {
  try {
    await client.connect();
    const sql = fs.readFileSync("schema.sql", "utf8");
    await client.query(sql);
    console.log("✅ schema.sql executed successfully");
  } catch (err) {
    console.error("❌ Error executing schema.sql:", err);
  } finally {
    await client.end();
  }
})();
