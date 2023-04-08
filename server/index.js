import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
 }

const app = express();
app.use(cors(corsOptions));
app.use(express.json({limit:'50mb'}));


app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);


app.get('/',async (req,res) => {
    res.send('Hello FROM Dalle')
});


const startServer = async () => {

    try {
        connectDb(process.env.MONGODB_URL);
        app.listen(3000,() => {
            console.log('Server HAs Server on Port 3000');
        })
    } catch (error) {
        console.log(error)
    }

    
}

startServer();