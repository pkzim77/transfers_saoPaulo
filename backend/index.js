const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors())

const transfer_routes = require("./routes/outsideRoute")

app.use(transfer_routes)

app.listen(3001, () =>{
    console.log("servidor rodando")
})