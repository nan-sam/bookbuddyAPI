const client = require("./client");

const getBooks = async () => {
  try {
    const SQL = `SELECT * FROM books`;
    const { rows } = await client.query(SQL);
    console.log(rows);
    if (!rows) {
      return {message:"something went wrong, no results"}
    }
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const createBook = async ({
  title,
  author,
  description,
  coverImage,
  available}) => {
    try {
      const SQL = `INSERT INTO books(
      title, 
      author, 
      description,
      coverImage,
      available)
      VALUES ($1, $2, $3, $4, $5)`
      const {
        rows: [books],
      } = await client.query(SQL, 
        [
        title,
        author,
        description,
        coverImage,
        available
      ]);
      return books;
    } catch (err) {
      console.log(err)
    }
};



module.exports = { createBook, getBooks };