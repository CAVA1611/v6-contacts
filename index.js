var app = require('./server.js');
const dbConnect = require('./db.js');

var port = (process.env.PORT || 3030);

console.log("Starting API Server at port " + port);

dbConnect().then(
    () => {
        app.listen(port);
        console.log("Server ready...!!");
    },
    err => {
        console.log("Connection Error: " + err);
    }
)