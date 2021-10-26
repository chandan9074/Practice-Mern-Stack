const express = require('express');
const app = express();
const port = 3000;

const users = [
    {"id": 0, "name": "chandan"},
    {"id": 1, "name": "kumar"},
    {"id": 2, "name": "das"},
    {"id": 3, "name": "palak"},
    {"id": 4, "name": "rishi"},
]

app.get('/', (req, res)=>{
    res.send("hello node chandan");
})

app.get("/users", (req, res)=>{
    const user = req.query.search;
    const searchUser = users.filter(serUser => serUser.name.toLocaleLowerCase().includes(user));
    res.send(searchUser);
})

// dynamic routing
app.get("/users/:id", (req, res)=>{
    const user = req.params.id;
    const reqUser = users[user];
    res.send(reqUser);
})

app.get("/users", (req, res)=>{
    res.send(users)
})

app.listen(port, ()=>{
    console.log("lisiting from port ", port);
})