const express = require("express");
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

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

    //get api
    app.get('/users', async (req, res)=>{
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users)
    })
    
    // post api
    app.post('/users', async (req, res)=>{
      const data = req.body;
      const result = await userCollection.insertOne(data)
      console.log("here krishna", result);
      res.json(result)
    })

    //update api
    app.get("/users/:id", async (req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const user = await userCollection.findOne(query)
      // console.log(id)
      res.send(user)
    })
    
    app.put("/users/:id", async (req, res)=>{
      const id = req.params.id;
      const user = req.body;
      const filter = {_id: ObjectId(id)};
       const updateDoc = {
          $set: {
            name: user.name,
            email: user.email
          },
        };

        const result = await userCollection.updateOne(filter, updateDoc);
        res.json(result)
      // console.log("update id ", id)
      // console.log("data ", req.body)
    })
    
    //delete api
    app.delete('/users/:id', async (req, res)=>{
      const userid = req.params.id;
      const query = {_id: ObjectId(userid)};
      const result = await userCollection.deleteOne(query);

      res.json(result);

    })

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res)=>{
    res.send("hello express server");
})

app.listen(port, ()=>{
    console.log("Lisiting on port number ", port);
})