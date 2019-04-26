import React, { Component } from 'react';
import {Container, Alert} from 'react-bootstrap';
import TransactionComponent from './components/TransactionComponent';
import TransactionHistory from './components/TransactionHistory';
import axios from 'axios';

import './styles/global.css';

class App extends Component{
    state = {
        loading: true,
        balance: null,
        history: [],
        error: null
    }
    async componentDidMount(){
        try{
            const { data } = await axios.get('/transactions');
            const loading = false;
            let history = [];
            let balance = null;
            if(data.length){
                history = data;
                balance = data[0].balance;
            }
            this.setState({
                loading,
                history,
                balance
            })
        }catch(error){
            this.setState(prevState =>({
                ...prevState,
                error: error.response.data.message,
                loading: false
            }))
        }
    }
    sendTransaction = async(transaction)=> {
        try{
            const { data } = await axios.post('/transactions', { type: transaction.type, amount: parseFloat(transaction.amount)});
            const history = [...this.state.history];
            history.unshift(data);
            this.setState(prevState =>({
                ...prevState,
                balance: data.balance,
                history
            }))
        }catch(error){
            this.setState(prevState =>({
                ...prevState,
                error: error.response.data.message
            }))
        }
    }
    render() {
        const { loading, balance, history, error} = this.state;
        return (
        <Container>
            {!loading && error && (
            <Alert variant="danger">
                <Alert.Heading>You got an error!</Alert.Heading>
                <p>
                    {error}
                </p>
            </Alert>
            )}
            {!loading && <TransactionComponent sendTransaction={this.sendTransaction}/>}
            {!loading && balance && (
                <Alert variant="primary">
                    Account Balance: $ { parseFloat(balance) }
                </Alert>
            )}
            {!loading && history.length > 0 && <TransactionHistory history={history}/>}
            
        </Container>
        )
    }
}

export default App;
