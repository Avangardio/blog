const axios = require('axios')
const { Buffer } = require('node:buffer');
const express = require('express')
const buffer = require("buffer");
const app = express()
const port = 3000

app.get('/count', (req, res) => {
    console.log(req.body)
})

app.get('/return', (req, res) => {
    res.status(200).json(array)
})
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
let array= [];
for(let i = 0; i<1e3; i++){
    const time = Date.now();
    const text = makeid(50);
    array.push({text, time});
}
app.get('/', async (req, res) => {
    console.time()
    const asxios = await axios.post(
        "http://localhost:3000/count",
        {
            body: Buffer.from(array)
        }
    )
    console.timeEnd()
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})