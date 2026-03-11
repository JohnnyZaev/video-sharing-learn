import express, {Express} from 'express';

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.get('/', (req, res) => {
    res.send('Welcome to the video server');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})