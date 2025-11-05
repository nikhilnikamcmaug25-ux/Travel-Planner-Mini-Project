import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { getContactById } from './services/ContactService'; // <-- Your API function

 export const ViewContact = () => {
  const { id } = useParams(); // **Correctly extracts "112" from the URL**
  const [Contact, setContact] = useState(null);

  useEffect(() => {
    // 1. Check if 'id' exists before trying to fetch
    if (id) {
        // 2. Call your backend service to fetch the contact details
        // getContactById(id)
        //   .then(response => setContact(response.data))
        //   .catch(error => console.error('Error fetching contact:', error));
        console.log(`Fetching contact with ID: ${id}`);
    }
  }, [id]);

  // Handle loading state or missing contact
  if (!contact) {
    return <h2>Loading Contact ID: {id}...</h2>; 
  }

  // Render the contact details
  return (
    <div>
      <h2>Contact Details</h2>
      <p>ID: {Contact.id}</p>
      <p>Name: { Contact.name}</p>
      {/* ... other details */}
    </div>
  );
};

export default ViewContact;