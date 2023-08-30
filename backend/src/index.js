const express = require('express');
const connectToMongo = require('../db/conn');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path : "../config.env"});
connectToMongo();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.use('/api/v1/auth',require('../routes/userRoutes'));
app.use('/api/v1/notes',require('../routes/notesRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>
{
    console.log(`I am listening at PORT ${process.env.PORT}`);
})