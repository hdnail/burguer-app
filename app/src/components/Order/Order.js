import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients: {
                ingredients.map(ingredient => (
                    <span className={classes.Ingredient} key={ingredient.name}>
                        {ingredient.name} ({ingredient.amount})
                    </span>
                ))
            }</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;