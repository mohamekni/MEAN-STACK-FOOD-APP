import express from "express"
import cors from "cors"
import { sample_data, sample_tags } from "./data";

const app = express();
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

const port = 5000
app.listen(port, ()=> {
    console.log("website served on http://localhost:" + port);
    
})
