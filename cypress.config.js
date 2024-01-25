const { defineConfig } = require("cypress");
const mysql2 = require("mysql2");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        READFROMDB: ({ dbconfig, sql }) => {
          const client = mysql2.createPool(dbconfig);

          return new Promise((resolve, reject) => {
            client.query(sql, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
              client.end();
            });
          });
        },
      });
    },
  },
  DB: {
    host: "localhost",
    user: "root",
    password: "Test@12345",
    database: "test", // Update the database name if needed
    connectionLimit: 10,
  },
});

