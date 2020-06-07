import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burguer with the following ingredients:</p>
      <ul>
        {
          Object.keys(props.ingredientes).map(
            key => <li key={key}>
              <span style={{textTransform:'capitalize'}}>{key}</span>:
              {props.ingredientes[key]}
            </li>
          )
        }
      </ul>
      <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;