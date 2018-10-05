var express = require('express');
var routesql = require('./route/route_mysql')
var app = express();
app.use(routesql);

app.get('/', (req, res)=>{
    res.send('Express & MySQL')
})

app.listen(3210, ()=>{
    console.log('Server aktif di port 3210!')
})