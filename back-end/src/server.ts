import app from "./app.js";

const port = process.env.ACCESS_PORT || 5500;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
