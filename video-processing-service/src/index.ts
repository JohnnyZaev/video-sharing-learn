import express, {Express} from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app: Express = express();
app.use(express.json());
const port: string = process.env.PORT || '3000';

app.post('/process-video', (req, res) => {
    const inputFilePath= req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send('Bad request: Input and output file paths are required');
    }

    ffmpeg(inputFilePath)
        .outputOptions('-vf', 'scale=-1:360')
        .on('end', () => {
            return res.status(200).send('Processing finished successfully.');
        })
        .on('error', (err) => {
            console.error(err);
            res.status(500).send(`Internal Server Error: ${err.message}`);
        })
        .save(outputFilePath);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})