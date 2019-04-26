import React, { Fragment }from 'react';
import { Accordion, Card, Button, ListGroup} from "react-bootstrap";


const TransactionHistory = ({history}) => {
    return (
        <Fragment>
            <h3>Transaction History</h3>
            <Accordion>
                {
                    history.map(transaction => (
                        <Card key={transaction._id}>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={transaction._id}>
                                    Transaction Date: {transaction.effectiveDate}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={transaction._id}>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>Type: {transaction.type}</ListGroup.Item>
                                        <ListGroup.Item>Amount: {transaction.amount}</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))
                }
            </Accordion>
        </Fragment>
    )
}

export default TransactionHistory