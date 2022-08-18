import path from 'path';
import glob from 'glob'
import express, { Express } from 'express';

glob('../**/index.html', (err, files) => {
    if (err) console.log(err);
    // console.log(files);
})


const app: Express = express();
const port = process.env.PORT || 4002;
const root: string = path.join(process.cwd(), '../');
console.log(root)
console.log('************')

// serve static files
app.use(express.static(path.join(root, '/client/build')));
console.log(root)
app.get('*', function (req, res) {
    // console.log(path.join(root, 'deploy/client/index.html'))
    console.log("root", root)
    console.log(req.originalUrl)
    res.sendFile(path.join(root, 'client/build/index.html'));
});


app.listen(port, () => {
    console.log('Hosted: http://localhost:' + port);
});