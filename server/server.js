
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const cookieParser = require('cookie-parser');
dotenv.config();
const distPath = path.join(__dirname, '..', 'dist');

app.use(cookieParser());
app.use('/dist', express.static(distPath));

app.get('/', (req, res) => {
    console.log('/ invoked');
    const htmlPath = path.join(__dirname, '/../index.html')
    res.sendFile(htmlPath);
})

app.get('/oauth/redirect', (req, res) => {
    const url = `${process.env.TRIP_MARKER_SERVRE_URL}/auth/code`;
    if(req.query.error) {
        axios.post(url, {error: req.query.error});
        res.redirect('/');
    } else {
        axios.post(url, {code: req.query.code})
        .then((serverResp) => {
            res.cookie("userSession", serverResp.data.sessionId);
            res.redirect('/');
        })
        .catch(ex => {
            console.log('Exception in server call', ex);
            res.redirect('/');
        });
    }
})

app.listen(process.env.PORT, () => console.log(`app started at ${process.env.PORT}`));