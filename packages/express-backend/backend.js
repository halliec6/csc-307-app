// backend.js
import express from "express";
import cors from "cors";
import user_services from "./user-services.js"


const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

        user_services.getUsers(name, job)
        .then((result)=>{
          if (result) res.send(result)
          else res.send([]);
        })
        .catch((error)=>{
          res.status(404).send("Not found")
        })
    }
  );


  //RIGHT ONE
  app.post("/users", async(req, res) => {
    const userToAdd = req.body;
    user_services.addUser(userToAdd)
      .then((result)=>res.status(201).send(result));
  });


  app.delete("/users/:id", (req, res)=>{
    const id = req.params.id;
    user_services.findUserByIdAndDelete(id)
      .then((data)=>{
        if(data === null){
          res.status(404).send("Resource not found");
        }else{
          res.status(204).send();
        }
      })
      .catch((err)=> res.status(500).send({error:err.message}));
  })

  app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    user_services.findUserById(id)
      .then((result) => {
        if (result) res.send(result);
        else res.status(404).send(`Not Found: ${id}`);
      })
      .catch((error) => {
        res.status(500).send(error.name);
      });
    });