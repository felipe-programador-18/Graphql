const express = require("express")
const app = express();
const schema = require("./schema/schema")

const mongoose = require("mongoose")


const UserName= "felipe"
const password='45zS8476YkKDj9Vt'
const ConnectionUSER = `mongodb+srv://${UserName}:${password}@cluster0.c3xxsmc.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(ConnectionUSER)
mongoose.connection.once("open", () => {
    console.log("connect with my database with success!!")
})



// this is interesting!!
const {graphqlHTTP} = require("express-graphql") 



//this small structure will render my graphql
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, () => {
    console.log("server its running on port 5000!!")
})