import { Alert, Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
// Import services for fetching and deleting contacts
import { deleteContact, getAllContact } from "../services/ContactService"; 
import '../assets/css/contactList.css';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


export function ContactList() {
    // 1. State for the list of contacts (using correct camelCase: contacts)
    const [contacts, setContacts] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    // 2. State for the item selected for deletion (using correct camelCase: selectedContact)
    const [selectedContact, setSelectedContact] = useState(null); 

    const navigate = useNavigate();

    // Function to fetch all contacts from the server
    const fetchContacts = async () => {
        try {
            const response = await getAllContact();
            console.log(response.data);
            setContacts(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load contact messages.", { theme: "colored" });
        }
    }

    // Load contacts on component mount
    useEffect(() => {
        fetchContacts();
    }, []);

    // Function to close the confirmation modal
    const hideConfirmation = () => {
        setShowConfirmation(false);
       
    }

    const showSuccessToast = () => {
        toast.success("Contact message deleted successfully.", {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Bounce,
        });
    }

    const showErrorToast = () => {
        toast.error("Contact deletion failed. Check server status.", {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Bounce,
        });
    }

    // Handler for performing the actual deletion
    const handleDeleteContact = async () => {
        try {
            if (selectedContact) {
                // Call the service function with the selected contact's ID
                const response = await deleteContact(selectedContact.id); 
                
                if (response.status === 200) {
                    showSuccessToast();
                    
                    // Filter the state array to instantly remove the deleted item from the UI
                    const remainingContacts = contacts.filter((c) => {
                        return c.id !== selectedContact.id
                    });
                    
                    setContacts(remainingContacts);
                }
            }
        } catch (error) {
            console.error("Delete Error:", error);
            
            // Safe check for Axios error status
            if (error.response?.status === 500) { 
                showErrorToast();
            } else if (!error.response) {
                 toast.error("Network error: Server unreachable.", { theme: "colored" });
            }
        }
        finally {
            setShowConfirmation(false);
            setSelectedContact(null); // Always clear the selected item after action
        }
    }

    return (
        <Container className="mt-3">
            <ToastContainer /> {/* Container for displaying toasts */}
            <Row>
                <Col lg={12} className="my-3">
                    <Alert variant="primary">Contact Messages List</Alert>
                </Col>
            </Row>
            
            {contacts.length === 0 ? (
                <Alert variant="info">No contact messages received yet.</Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Received On</th>
                            <th>Read</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <tr key={contact.id}>
                                        <td>{index + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.subject}</td>
                                        {/* Display only a snippet of the message */}
                                        <td>{contact.message.substring(0, 50)}...</td> 
                                        {/* Format the created_at field */}
                                        <td>{contact.created_at ? new Date(contact.created_at).toLocaleDateString() : 'N/A'}</td> 
                                        <td>{contact.IS_READ === 1 ? 'Yes' : 'No'}</td>
                                        <td>
                                            <Button variant="danger" size="sm" className="action-button me-2" onClick={() => {
                                                setShowConfirmation(true);
                                                setSelectedContact(contact); // Set the item for deletion
                                            }}>Delete</Button>
                                            
                                            {/* Assuming an Edit/View functionality exists */}
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="action-button"
                                                onClick={() => {
                                                    navigate(`/view-contact/${contact.id}`);
                                                }}>View</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            )}

            {/* Confirmation Modal */}
            <Modal show={showConfirmation} onHide={hideConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the message from **{selectedContact ? selectedContact.name : ''}**?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideConfirmation}>
                        No (Cancel)
                    </Button>
                    <Button variant="danger" onClick={handleDeleteContact}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}