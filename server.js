const express = require("express");
const app = express();
const PORT = 4000
const bcrypt = require("bcrypt");
const saltround = 10;


const users = [
    {username:"sajeesh", password:"$2b$10$w.Uxvpfv7psrSI2Cd4TAX.eUXSrGHGFy96p1A8EZQN.YzqXGsw.hq"}
]

app.use(express.urlencoded({extended:true}));

app.get("/signup", (req, res)=>{
    res.status(200).sendFile(__dirname + "/signup.html");
});

app.post("/signup", (req, res)=>{
    const {username, password} = req.body;
    bcrypt.hash(password, saltround,(err, hash)=>{
        if(err){
            console.log(err.message);
        }else{
            // console.log(hash);
            res.status(303).redirect("/");
        }
    });
});

app.get("/", (req,res)=>{
    res.status(200).sendFile(__dirname + "/login.html");
});

app.post("/", (req,res)=>{
    const {username, password} = req.body;
    const user = users.find((user)=>user.username === username);
    if (!user){
        res.send("Invalid credentials");
    }else{
        bcrypt.compare(password, user.password,(err, isPassword)=>{
            if(err){
                res.send("Invalid credentials");
            }else if(!isPassword){
                res.send("Invalid credentials");
            }else{
                res.redirect("https://sajeeshp94.github.io/react-digital-portfolio/");
            }
        })
    }
})

app.get("https://sajeeshp94.github.io/react-digital-portfolio/", (req,res)=>{
    res.sendFile(__dirname + "https://sajeeshp94.github.io/react-digital-portfolio/")
});

app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port 4000`);
})