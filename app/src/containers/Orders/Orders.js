import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import classes from './Orders.module.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const orders = [];
                for (let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({orders: orders, loading: false});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <div className={classes.Orders}>
                { this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.totalPrice} />
                )) }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);