const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.rwfgqco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const serviceCollection = client
      .db('ElonPhotography')
      .collection('services');
    const reviewCollection = client.db('ElonPhotography').collection('reviews');
    const orderCollection = client.db('ElonPhotography').collection('orders');

    app.get('/services', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      // console.log(result);
    });
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      // const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
      // console.log(result);
    });

    app.post('/orders', async (req, res) => {
      const orders = req.body;
      // console.log(orders);
      const result = await orderCollection.insertOne(orders);
      // console.log(result);
      res.send(result);
      // res.send(result);
      // console.log(result);
    });
    app.get('/orders', async (req, res) => {
      const query = {};
      // console.log(orders);
      const cursor = orderCollection.find(query);
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    });

    app.delete('/orders/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });

    app.get('/reviews', async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      // console.log(result);
    });

    app.post('/reviews', async (req, res) => {
      const review = req.body;
      // const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.insertOne(review);
      // const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
      // res.send(result);
      // console.log(result);
    });

    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
