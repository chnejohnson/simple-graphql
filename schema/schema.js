const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require("graphql");
const _ = require("lodash");

//dummy data
const books = [
  { name: "Atlas Strugged I", genre: "novel", id: "1", authorId: ["1"] },
  {
    name: "Radical Markets",
    genre: "economics",
    id: "2",
    authorId: ["2", "3"]
  },
  { name: "Soul Mountain", genre: "novel", id: "3", authorId: ["4"] },
  { name: "Atlas Strugged II", genre: "novel", id: "4", authorId: ["1"] }
];

const authors = [
  { name: "Ayn Rand", gender: 0, id: "1" },
  { name: "Glen Weyl", gender: 1, id: "2" },
  { name: "Eric Posner", gender: 1, id: "3" },
  { name: "Gao Xingjian", gender: 1, id: "4" }
];

//GraphQL Type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        let res = [];
        authors.forEach(o => {
          parent.authorId.forEach(e => {
            if (o.id === e) {
              res.push(o);
            }
          });
        });
        return res;
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: [parent.id] });
      }
    }
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
