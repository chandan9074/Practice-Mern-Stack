const { MongoClient } = require('mongodb');
const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z2qxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    console.log("hello man")

    const database = client.db("carMachanics");
    const serviceCollection = database.collection("services");

    // get api
    app.get("/services", async (req, res)=>{

        // const query = { runtime: { $lt: 15 } };

        const cursor = serviceCollection.find({});
        const services = await cursor.toArray();
        // const result = await serviceCollection.insertOne(service);
        // console.log(result)
        res.send(services)
        // console.log(req.body)
    })
    
    // single service get 
    
    //post api
    app.post("/services", async (req, res)=>{
        const service = req.body;
        const result = await serviceCollection.insertOne(service);
        console.log(result)
        res.json(result)
        // console.log(req.body)
    })
  }
  finally{
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res)=>{
    res.send("hore krishno")
})

app.listen(port, ()=>{
    console.log(`lisiting port on ${port}`)
})