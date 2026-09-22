import express from "express";
import pg from "pg";

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 3000);
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@127.0.0.1:5432/rundiff_bridge";

const pool = new Pool({ connectionString: databaseUrl });

app.get("/health", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(503).json({ ok: false, error: error.message });
  }
});

app.post("/widgets", async (_request, response) => {
  const result = await pool.query("SELECT 1::int AS ok");
  response.status(200).json({
    ok: result.rows[0].ok === 1,
    meta: "warning-proof-response-size-padding-0123456789-abcdefghijklmnopqrstuvwxyz"
  });
});

const server = app.listen(port, "127.0.0.1", () => {
  process.stdout.write(`listening on http://127.0.0.1:${port}\n`);
});

const shutdown = async () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
