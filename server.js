import express from 'express'
import cores from 'cors'
const app = express()
import {generate} from './chatbot.js';
const port = 3001

app.use(cores());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome to chat!!')
})

app.post('/chat',async (req,res)=>{

    const {message,threadId}=req.body;

    if(!message || !threadId){
        return res.status(400).json({error:"message and threadId are required"});
    }

    console.log("Received message:",message);

    const result =await generate(message,threadId);

    res.json({message:result});

});

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
