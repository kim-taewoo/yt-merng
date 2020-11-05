const postsResolvers = require('./posts')
const usersResolvers = require('./users')

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
}