const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { GraphQLError } = require('graphql')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

let books

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        query.author = author.id
      }

      if (args.genre) {
        query.genres = { $in: args.genre }
      }

      const books = await Book.find(query).populate('author')
      return books
    },
    allAuthors: async () => {
      books = await Book.find()
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  /*Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length
  },*/
  Author: {
    bookCount: async (root) => {
      return books.filter((book) => String(book.author) === String(root.id))
        .length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      /*if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }*/
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        }
      }
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      /*if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }*/
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator('BOOK_ADDED') }
  }
}

module.exports = resolvers
