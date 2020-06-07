import React from 'react';
import classes from './Burguer.module.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

const burguer = (props) => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(
      (igKey) => {
        return [...Array(props.ingredients[igKey])]
          .map(
            (_, i) => <BurguerIngredient key={igKey + i} type={igKey} />
          ) 
      }
    )
    .reduce((acumulator, e) => acumulator.concat(e), []);
  
  return (
    <div className={classes.Burguer}>
      <BurguerIngredient type="bread-top" />
      {transformedIngredients.length === 0 ?
        <p>Please start adding ingredients!</p> : transformedIngredients
      }
      <BurguerIngredient type="bread-bottom" />
    </div>
  );
};

export default burguer;