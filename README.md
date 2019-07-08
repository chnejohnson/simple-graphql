# Simple GraphQL
This project uses the way called [GraphQL.js GraphQLSchema object](https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d) to write GraphQL API, which is defferent from RESTful API. It's a simple way to understand GraphQL's power and test it by GraphiQL easily.

There are two dummy data about book collection and author collection respectively. The book collection has id, name, genre, and authorId. On the other hands, the author collection has id, name, and gender. You can easily find the book's authors or the author's books by querying with GraphiQL, have fun!

## Guild

At first, run

`yarn install` or `npm install`
to install all dependencies.

To host the GraphQL server, run

`node index.js`

and go to the browser at http://localhost:4000/graphql to query the data, for example:

`query Author {
  authors {
    name
    gender
    books {
      name
    }
  }
}`

or

`
query Book {
  book(id: 2) {
   	name
   	genre
  	authors {
      name
    }
  }  
}
`

## References
- [GraphQL Tutorial by The Net Ninja](https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f&index=1)
- [Three ways to represent your GraphQL schema](https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d)