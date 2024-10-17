const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const dotenv = require('dotenv');

dotenv.config();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
const port = process.env.PORT || 3000;

const userrouter = require('./routes/userroutes')
const postrouter = require('./routes/postroutes');

app.use('/api/v1/auth', userrouter);
app.use('/api/v1/posts', postrouter);

app.get('/', (req,res)=>{
    res.send('Hello, World!');
});

app.listen(port, ()=>{
    console.log('Server is running on port 3000');
});