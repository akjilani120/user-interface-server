const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');

require('dotenv').config()
const corsConfig = {
    origin: true,
    credentials: true,
}
// Middle ware
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r3qhe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const loginCollection = client.db("userCollection").collection("user");

        app.post("/login", async (req, res) => {
            const user = req.body;
            const email = user.email;
            const filter = { email }
            const emailData = await loginCollection.findOne(filter)
            if (emailData) {
                res.status(200).send({message:"login successful",emailData})
                
            }else{
                res.status(500).send({message:"login unsuccessful"})
            }
        })
       

    } finally {

    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})