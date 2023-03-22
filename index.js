const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const initailaizeDbandserver = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running in http://localhost:3000/");
    });
  } catch (e) {
    console.log(`dbError:${e.message}`);
    process.exit(1);
  }
};
initailaizeDbandserver();

app.get("/books/", async (request, response) => {
  const getBookQurey = `SELECT *
FROM book
ORDER BY book_id;`;
  const displayBooks = await db.all(getBookQurey);
  response.get(displayBooks);
});
