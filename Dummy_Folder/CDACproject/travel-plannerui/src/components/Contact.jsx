import { Alert, Col, Button, Container, Row, Form } from "react-bootstrap";
import { useState } from "react";
import { savecontact } from '../services/ContactService';
import { Bounce, toast } from "react-toastify";



export function Contact() {

    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', IS_READ: 0 });
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
            
        try {
             event.preventDefault();
            console.log(formData);
            const response = await savecontact(formData); 
            console.log(response);
            if (response.status === 200) {
                toast.success("Message Sent Successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 500) { 
               
                toast.error("Something went wrong on the server.", { 
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        }
    }
    return (

        <Container className="mt-4">
            <Row>
                <Col lg={8} >
                    <Alert variant="primary">contact_us</Alert>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter te name" name="name" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" name="email" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="Enter the Subject" name="subject" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} name="message" onChange={handleChange} />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit </Button>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
}