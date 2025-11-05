import { Alert, Col, Container, Row } from "react-bootstrap";

export function Dashboard(){
    return(
         <Container className="mt-5">
            <Row>
                <Col lg={8}>
                    <Alert variant="primary">Welcome to app</Alert>
                    <p>You can conatct US</p>
                </Col>
            </Row>
        </Container>
    )
}