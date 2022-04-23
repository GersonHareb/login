const pg = require("pg");
//Put your queries here
const pool = new pg.Pool({
  user: "-------",
  host: "----",
  database: "-----",
  password: "----",
  port: 5432,
});

//login get
async function getLogin(email, password) {
  const values = [email, password];
  const query = {
    text: `SELECT * FROM login WHERE email = $1 AND password = $2`,
    values: values,
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getLogin };
