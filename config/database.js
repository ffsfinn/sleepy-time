const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('connected', function(){
    console.log(`Connected to MongoDB on host:${db.host} and port:${db.port}`)
});