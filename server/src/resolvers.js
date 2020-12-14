const resolvers = {
  Query: {
    contacts: (parent, args, { models }) => models.Contact.find()
  },
  Mutation: {
    addContact: (parent, args, { models })  => models.Contact.create(args),
    deleteContact: (parent, { id }, { models }) => models.Contact.deleteOne(id),
    updateContact: (parent, args, { models }) => models.Contact.findOneAndUpdate(args)
  }
}

module.exports = resolvers
