import { Alert, Col, Button, Container, Row, Form } from "react-bootstrap";
import { useState } from "react";
import { saveFeedback } from '../services/FeedbackService'; 
import { Bounce, toast, ToastContainer } from "react-toastify";


export function Feedback() { 

    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [currentUserId] = useState(120); 


    const handleChange = (event) => {
        setFeedbackMessage(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); 
            
        try {
            // Payload strictly matches the 'feedback' table schema: (user_id, message)
            const payload = {
                // Using 'user_id' (lowercase) to match conventional JS variable naming 
                // and the backend destructuring { user_id, message }
                user_id: currentUserId,
                message: feedbackMessage
            };

            const response = await saveFeedback(payload); 
            
            if (response.status === 200) {
                toast.success("Feedback submitted! Thank you.", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                    transition: Bounce,
                });
                
                // Reset form field
                setFeedbackMessage('');
            }
        } catch (error) {
            console.error("Error sending feedback:", error);
            
            let errorMessage = "Could not connect to the server. Please check the API.";
            if (error.response?.status === 500) { 
                 errorMessage = "Server Error: Could not save feedback to the database.";
            } else if (error.response?.status === 400) { 
                 errorMessage = "Error: Missing user ID or message in the request.";
            }
            
            toast.error(errorMessage, { 
                position: "top-right",
                theme: "colored",
                transition: Bounce,
            });
        }
    }
    
    return (
        <Container className="mt-4">
            <ToastContainer /> 
            <Row>
                <Col lg={8} >
                    <Alert variant="info">User Feedback Submission</Alert>
                    <p className="text-muted">You are submitting feedback as **User ID: {currentUserId}**.</p>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col lg={6}>
                    <Form onSubmit={handleSubmit}>
                        
                        <Form.Group className="mb-3" controlId="formFeedbackMessage">
                            <Form.Label>Your Feedback Message</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={5} 
                                name="feedbackMessage" 
                                placeholder="Enter your detailed feedback here..."
                                value={feedbackMessage} 
                                onChange={handleChange} 
                                required
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" disabled={!feedbackMessage}>
                            Submit Feedback 
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}