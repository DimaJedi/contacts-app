import React, { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useMutation, useQuery } from '@apollo/client'

const columns = [
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
]

const CONTACTS = gql`
    query GetContacts {
        contacts {
            id
            firstName
            lastName
            email
            phone
            address
        }
    }
`

const ADD_CONTACT = gql`
    mutation AddContact($firstName: String!, $lastName: String!, $phone: String, $email: String, $address: String) {
        addContact (firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, address: $address) {
            id
            firstName
            lastName
            email
            phone
            address
        }
    }
`

const TableView = () => {
  const [open, setOpen] = useState(false)
  const [contact, setContact] = useState({})
  const { loading: queryLoading, error, data = {} } = useQuery(CONTACTS)
  const [addContact, {
    data: addedContact,
    loading: mutationLoading,
    error: mutationError
  }] = useMutation(ADD_CONTACT, {
      update (cache, { data: { addContact } }) {
        cache.modify({
          fields: {
            contacts (existingContacts = []) {
              const newContactRef = cache.writeFragment({
                data: addContact,
                fragment: gql`
                    fragment NewContact on Contact {
                        id
                        firstName
                        lastName
                        email
                        phone
                        address
                    }
                `
              })
              return [...existingContacts, newContactRef]
            }
          }
        })
      }
    }
  )

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }))

  const content = <div style={{
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  }} className={useStyles().paper}>
    <h2 id="simple-modal-title">Add contact</h2>
    <p id="simple-modal-description">
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </p>
    <Container>
      <TextField label="First name" value={contact.firstName}
                 onChange={({ target: { value: firstName } }) => setContact({
                   ...contact,
                   firstName
                 })}/>
      <TextField label="Second name" value={contact.lastName}
                 onChange={({ target: { value: lastName } }) => setContact({ ...contact, lastName })}/>
      <TextField label="Email" value={contact.email}
                 onChange={({ target: { value: email } }) => setContact({ ...contact, email })}/>
      <TextField label="Phone" value={contact.phone}
                 onChange={({ target: { value: phone } }) => setContact({ ...contact, phone })}/>
      <TextField label="Address" value={contact.address}
                 onChange={({ target: { value: address } }) => setContact({ ...contact, address })}/>
    </Container>
    <Button variant="contained" color="primary" onClick={() => {
      addContact({ variables: contact })
      setContact({})
      handleClose()
    }}>
      Submit
    </Button>
  </div>

  return <>
    <div className="table-view" style={{ height: 400, width: '80%' }}>
      <DataGrid rows={data.contacts || []} columns={columns} hideFooter/>

    </div>
    <Button variant="contained" color="primary" onClick={handleOpen}>
      Add contact
    </Button>
    {(mutationLoading || queryLoading) && <CircularProgress/>}
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {content}
    </Modal>
  </>
}

export default TableView
