const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// use middleware
app.use(cors());
app.use(express.json());

// database
// --------------

// Secret uri to connect with my database id
const uri =
  'mongodb+srv://dbuser1:mEJegHLiwEI68I8U@cluster0.puuod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// To create client with secret uri
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Define a run function to send or receive data from the database
const run = async () => {
  try {
    // connect with client (making a connection)
    await client.connect();

    // Create Database on the defined client and a collection inside the database..
    // If the database and collection already exist it will just get the access
    const userCollection = client.db('myApp').collection('users');

    // Post a document(user) from client side store it to database and send the response to the client
    // post
    app.post('/user', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(user);
    });

    // Get a document from database and send it to the client
    app.get('/user', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // Update data
    app.put('/users/:id', async (req, res) => {
      const user = req.body;
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const updateUser = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateUser);
      res.send(result);
    });

    // Delete data
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
    // await client.close()
  }
};
// Invoke run function
run().catch(console.dir);

// listen
app.listen(port, () => {
  console.log('server running...');
});
