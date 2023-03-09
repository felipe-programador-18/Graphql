const express = require("express")
const app = express();
const schema = require("./schema/schema")


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