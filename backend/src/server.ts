import express from "express"
import cors from "cors"
import { sample_data, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken"


const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))

app.get( "/api/foods",(req,res)=>{
    res.send(sample_data)
})
app.use("/api/foods/search/:searchTerm",(req,res)=> {
    const searchTerm = req.params.searchTerm
    const food = sample_data
    .filter(food=>food.name.toLowerCase()
    .includes(searchTerm.toLowerCase()))
    res.send(food)
})
app.use("/api/foods/tags",(req,res)=>{
    res.send(sample_tags)
})

app.use("/api/foods/:foodId",(req,res)=>{
    const foodId = req.params.foodId
    const foods = sample_data.find(food=>food.id===foodId)
    res.send(foods)
})

app.use("/api/foods/tag/:tagName",(req,res)=>{
    const tagName = req.params.tagName
    const foods = sample_tags.filter(food => food.tags?.includes(tagName))
    res.send(foods)
})

app.post("/api/users/login" , (req,res)=>{
    const {email,password} = req.body
    const user = sample_users.find(user=> user.email === email && user.password === password)
    if(user){
        res.send(generateTokenResonse(user))
    }else{
        res.status(400).send("user name or password is not valid")
    }
})

const generateTokenResonse =(user:any)=>{
    const token = jwt.sign({
        email:user.email , isAdmin:user.isAdmin
    },"SomeRandomText",{
        expiresIn :"30d"
    });

    user.token = token
    return user
}

const port = 5000
app.listen(port, ()=> {
    console.log("website served on http://localhost:" + port);
    
})
