const { gql } = require('apollo-server-express');

module.exports = gql`
    type Contact {
        id: ID!
        firstName: String!
        lastName: String!
        phone: String
        email: String
        address: String
    }

    type Query {
        contacts: [Contact]
    }

    type Mutation {
        addContact(firstName: String!, lastName: String!, phone: String, email: String, address: String): Contact
        deleteContact(id: ID!): Boolean
        updateContact(id: ID!, firstName: String!, lastName: String!, phone: String, email: String, address: String): Contact
    }
`


