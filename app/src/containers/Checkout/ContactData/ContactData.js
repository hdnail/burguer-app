import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                valueType: 'name',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                valueType: 'street',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'                    
                },
                valueType: 'zip code',
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                valueType: 'country',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                valueType: 'email',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue:'Fastest'},
                        {value: 'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value: '',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        value = value.trim();
        if (rules.required) {
            isValid = (value !== '') && isValid;
        }
        if (rules.minLength) {
            isValid = (value.length >= rules.minLength) && isValid;
        }
        if (rules.maxLength) {
            isValid = (value.length <= rules.maxLength) && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});

        const orderData = {};
        for (let name in this.state.orderForm) {
            orderData[name] = this.state.orderForm[name].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: orderData
        };

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({ loading: false });
            this.props.history.replace('/');
        })
        .catch(error => {
            this.setState({ loading: false });
        });
    }

    inputChangedHandler = (event, inputName) => {
        const orderForm = {
            ...this.state.orderForm
        };
        orderForm[inputName].touched = true;
        orderForm[inputName].value = event.target.value;
        if (orderForm[inputName].validation) {
            orderForm[inputName].valid = this.checkValidity(
                event.target.value,
                orderForm[inputName].validation
            );
        }

        let formIsValid = true;
        for (let name in orderForm) {
            if (typeof orderForm[name].valid !== 'undefined') {
                formIsValid = orderForm[name].valid && formIsValid;
            }
        }

        this.setState({orderForm: orderForm, formIsValid: formIsValid});
    }
    
    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                { this.state.loading ?
                    <Spinner /> : 
                    <form onSubmit={this.orderHandler}> {
                        formElements.map(element => (
                            <Input
                                key={element.id}
                                elementType={element.config.elementType}
                                elementConfig={element.config.elementConfig}
                                value={element.config.value}
                                valueType={element.config.valueType}
                                invalid={!element.config.valid}
                                shouldValidate={element.config.validation}
                                touched={element.config.touched}
                                changed={(event) => this.inputChangedHandler(event, element.id)} />
                        )) }
                        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>
                }
            </div>
        );
    }
}

export default withRouter(ContactData);