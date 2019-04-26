import React, { Component, Fragment } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default class TransactionComponent extends Component{
    state ={
        amount: 0,
        negativeError: false,
        type: null
    }
    handleAmount = event => {
        let amount = event.target.value;
        let negativeError = false;
        if(amount < 0) {
            negativeError=true;
        }
        this.setState(prevState =>({
            ...prevState,
            amount,
            negativeError
        }))
    }
    handleSelect = event => {
        let type = event.target.value;
        if(type === 'select') type = null;
        this.setState(prevState =>({
            ...prevState,
            type
        }))
    }
    checkDisabled = () => {
        const { amount , negativeError, type } = this.state;
        return (!amount || amount === ''|| negativeError || !type);
    }
    submit = e =>{
        e.preventDefault();
        const { amount , type } = this.state;
        const { sendTransaction } = this.props;
        sendTransaction( {
            amount,
            type
        })
        return this.setState(prevState =>({
            amount : 0,
            negativeError: false
        }))
    }
    render(){
        const { amount, negativeError} = this.state;
        return(
            <Fragment>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className="title">
                            New Transaction
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="Amount" onChange={this.handleAmount} value={amount} min="0"/>
                                { negativeError && (
                                    <Form.Text className="error"> negatives number forbidden</Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Type</Form.Label>
                                <Form.Control as="select" onChange={this.handleSelect}>
                                    <option>select</option>
                                    <option>debit</option>
                                    <option>credit</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={this.checkDisabled()} onClick={this.submit}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}