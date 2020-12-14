import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Table from './components/Table'
import './App.css'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  connectToDevTools: true
})

function App () {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Table/>
      </div>
    </ApolloProvider>
  )
}

export default App
