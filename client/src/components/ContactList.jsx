import React from 'react';
import { Link } from 'react-router-dom';

const ContactList = ({ contacts }) => {
  return (
    <div className="contact-list">
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.contactId}>
            <Link to={`/chat/${contact.contactId}`}>{contact.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
