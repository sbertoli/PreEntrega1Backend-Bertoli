import express from 'express';

const app = express();

const PORT = 8080;

app.listen(PORT, () => console.log(`ESCUCHANDO EN ${PORT}`))

const users = [
    {
        id:1,
        firstName: "Juana",
        lastName: "pepa"
    },
    {
        id:2,
        firstName: "esteban",
        lastName: "ffernandez"
    },
    {
        id:3,
        firstName:"Juana",
        lastName:"pai"
    },
    {
        id:4,
        firstName:"esteban",
        lastName:"ffernandez"
    }
]

app.get('/', (request, response) => {
    response.send("hola express");
})
app.get('/users', (req, res) => {
    console.log(req.query)
    const {name} = req.query;
    if(!name){
        return res.send({
        users: users
    });
    }
    else{
        const filteredUsers = users.filter(u=>u.firstName === name);
        return res.send({
            users:filteredUsers
        })
    }
  
})

app.get('/users/:uid/', (req, res) => {
    console.log(req.params)
    const { uid } = req.params;
    const userId = parseInt(uid);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.send(user);
    } else {
        res.send("usuario no encontrado");
    }
})