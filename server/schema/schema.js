const graphql= require("graphql")
const {GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
     GraphQLID,
     GraphQLInt,
     GraphQLList
    } = graphql;

// lodash is very powerfully
const _ = require("lodash")


const movies = [
    {name:"Doctor Rey", genre:"comedy", id:"1", directorId:"1" },
    {name:"Doctor more than one", genre:"Drama", id:"2",directorId:"2"  },
    {name:"Doctor To two this", genre:"Romance", id:"3",directorId:"3"  },
    {name:"Doctor testing", genre:"action", id:"4", directorId:"4"  },
    {name:"Doctor Programmer", genre:"comedy", id:"5", directorId:"5"  },
    {name:"Doctor Felipe", genre:"comedy", id:"6", directorId:"6"  },
]

const directors = [
    {name:"Doctor ReyING ", age:28, id:"1" },
    {name:"Felipe Martins PROGRAMMER",age:25, id:"2" },
    {name:"PROGRAMMER FLORIPA", age:22, id:"3" },
    {name:"Doctor THE BEST PEOPLE IN THE WORLD", age:21, id:"4" },
    {name:"Doctor Programmer", age:29, id:"5" },
    {name:"Doctor KEEP IT UP GIVE YOUR BEST ALWAYS", age:49, id:"6" },
]


// this is new for me
const MovieType = new GraphQLObjectType(
    {
       name:"Movies",
       fields:() => ({
         id:{type:GraphQLID},
         name:{type:GraphQLString},
         genre:{type:GraphQLString},
          director:{
           type:DirectorType,
           resolve (parent,args){
            console.log(parent)
            return _.find(directors, {id: parent.directorId})

           }

         }
         
       })     
  }     
)

const DirectorType = new GraphQLObjectType({

    name:"Director",
    fields:() => ({
     id: {type: GraphQLID},
     name:{type:GraphQLString},
     age:{type:GraphQLInt},
      movies: {
      // I have to pass on my movieType as well as a new list  
      type: new GraphQLList(MovieType),
        resolve(parent, args){  
         return _.filter(movies, {directorId:parent.id} )
        }
       }
    })
})






// this is for me make search in my query!!
const rootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields: () => ({
      movie: {
        type:MovieType,
        args:{ id: {type:GraphQLID}},
        resolve(parent, args){
            //get date from database
         console.log(typeof args.id)   
         return  _.find(movies,{id:args.id})
        }
      },
      
    director: {
        type: DirectorType,
        args: {id:{type:GraphQLID}},
        resolve(parent, args){
          return _.find(directors,{id: args.id})   
        }
      },

    movies:{
     type: new GraphQLList(MovieType),
      resolve (parent, args){
       return movies;
      } 
    },

     directors: {
        type: new GraphQLList(DirectorType),
        resolve(parent,args){
          return directors;
        }
    }



    })
})



module.exports = new GraphQLSchema({
    query:rootQuery,
})