const exprees = require("express");
const { MongoClient } = require("mongodb");
const app = exprees();

require("dotenv").config();

const ObjectId = require("mongodb").ObjectId;

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
    const bookOrderCollection = database.collection("bookorder");

    // Get Service data from server
    app.get("/service", async (req, res) => {
      const findData = serviceCollection.find({});
      const result = await findData.toArray();
      res.json(result);
    });

    // Get Service Data One Specific Id
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.json(result);
    });

    // Post An Order On Database
    app.post("/order", async (req, res) => {
      const order = req.body;
      const result = await bookOrderCollection.insertOne(order);
      res.json(result);
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
