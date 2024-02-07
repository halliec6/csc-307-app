// backend.js
import express from "express";
import cors from "cors";
import user_services from "./user-services.js"


const app = express();
const port = 8000;
// const users = {
//     users_list: [
//       {
//         id: "xyz789",
//         name: "Charlie",
//         job: "Janitor"
//       },
//       {
//         id: "abc123",
//         name: "Mac",
//         job: "Bouncer"
//       },
//       {
//         id: "ppp222",
//         name: "Mac",
//         job: "Professor"
//       },
//       {
//         id: "yat999",
//         name: "Dee",
//         job: "Aspring actress"
//       },
//       {
//         id: "zap555",
//         name: "Dennis",
//         job: "Bartender"
//       }
//     ]
//   };
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

// const findUserByName = (name) => {
//     // return users["users_list"].filter(
//     //   (user) => user["name"] === name
//     // );
//     user_services.findUserByName(name)
//   };
  
  // app.get("/users", (req, res) => {
  //   const name = req.query.name;
  //   if (name != undefined) {
  //     let result = user_services.findUserByName(name);
  //     result = { users_list: result };
  //     res.send(result);
  //   } else {
  //     res.send(users);
  //   }
  // });

  // const findUserByNameJob = (name, job) => {
  //   // return users["users_list"].filter(
  //   //   (user) => user["name"] === name &&
  //   //             user["job"] === job
  //   // );
  //   user_services.getUsers(req.query.name, req.query.body)
  // };
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    // if (name != undefined && job!=undefined) {
    //   let result = user_services.findUserByNameJob(name, job);
    //   result = { users_list: result };
    //   res.send(result);
    // } else {
    //   res.send(users);
    // }
        user_services.getUsers(name, job)
        .then((result)=>{
          if (result) res.send(result)
          else res.send(users);
        })
        .catch((error)=>{
          res.status(500).send()
        })
    }
  );

  // const findUserById = (id) =>
  // // users["users_list"].find((user) => user["id"] === id);
  //   user_services.findUserById(id)

// app.get("/users/:id", (req, res) => {
//   const id = req.params["id"]; //or req.params.id
//   user_services.findUserById(id)
//     .then((result)=>{
//       if (result) res.send(result);
//       else res.status(404).send(`Not Found: ${id}`);
//     })
//     .catch((error)=> {
//       res.status(500).send(error.name);
//     })
// });
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
  
// why can't I use findUserByID, why is calling delete UserById better
const deleteUserById = (userId)=>{
  const index = users["users_list"].findIndex(existingUser => existingUser.id === userId);
  if(index!==-1){
    const deletedUser = users["users_list"].splice(index, 1)[0];
    // res.status(204).send
    // const deletedUser = deletedUsers[0]
    return deletedUser;    
  }else{
    // res.send(result);
    return null;
  }
} 

app.delete("/users", (req, res) => {
  const id = req.body.id; 
  const result = deleteUserById(id);
  if (result === null) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

// const addUser = (user) => {
//     users["users_list"].push(user);
//     return user;
//   };
  
  // app.post("/users", (req, res) => {
  //   const userId = Math.random()
  //   const userToAdd = {id: userId.toString(), name: req.body.name, job: req.body.job}
  //   user_services.addUser(userToAdd);
  //   res.status(201).json(userToAdd);
  // });
  
  app.post("/users", async(req, res) => {
    // const userId = Math.random()
    const userToAdd = req.body;
    user_services.addUser(userToAdd)
      .then((result)=>res.status(201).send(result));
  });

  