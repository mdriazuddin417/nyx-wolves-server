const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://nyxWolvex:fC5RdYFUh7gjaviN@cluster0.iojys.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const productCollection = client.db("testCrud").collection("products");

    //Single product Find
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });
    //Product Add
    app.post("/product", async (req, res) => {
      const product = req.body;

      const result = await productCollection.insertOne({ ...product });
      res.send(result);
    });

    // // //Product Get
    app.get("/product", async (req, res) => {
      const query = req.query;
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });

    //Product Delete
    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });
    //Product Update
    app.patch("/product/:id", async (req, res) => {
      const id = req.params.id;
      const product = req.body;
      const filter = { _id: ObjectId(id) };
      const update = {
        $set: { ...product },
      };

      const result = await productCollection.updateOne(filter, update);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello this is checking product server");
});

app.listen(port, () => {
  console.log(port, "Example port check");
});
