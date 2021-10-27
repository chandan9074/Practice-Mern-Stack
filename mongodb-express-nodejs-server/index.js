const express = require("express");
const { MongoClient } = require('mongodb');

const cors = require("cors");  

const app = express();
const port = 5000;

// user : mymongodb
// password : q7EvqdJo9GxtiNjI

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://mymongodb:q7EvqdJo9GxtiNjI@cluster0.z2qxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    const database = client.db("mongoUserPractice");
    const userCollection = database.collection("users");
    // create a document to insert
    // const doc = {
    //   name: "chandan kumar",
    //   email: "chandan@gmail.com",
    // }
    // const result = await userCollection.insertOne(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    
    // post api
    app.post('/users', async (req, res)=>{
      console.log("here krishna", req.body);
    })

  } finally {
    await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res)=>{
    res.send("hello express server");
})

app.listen(port, ()=>{
    console.log("Lisiting on port number ", port);
})