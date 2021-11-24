const exprees = require("express");
const { MongoClient } = require("mongodb");
const app = exprees();

require("dotenv").config();

app.use(exprees.json());

const cors = require("cors");

app.use(cors());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hf2pl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await client.connect();

    const database = client.db("BeautifulPerlour");
    const serviceCollection = database.collection("service");

    app.get("/service", async (req, res) => {
      const findData = serviceCollection.find({});
      const result = await findData.toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
};
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log(`Server is running on Port http://localhost:${port}`);
});
