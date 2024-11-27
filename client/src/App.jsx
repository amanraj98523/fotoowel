import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import axios from 'axios';

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('/api/contacts').then((response) => {
      setContacts(response.data);
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <ContactList contacts={contacts} />
        </Route>
        <Route path="/chat/:contactId">
          <ChatWindow />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
