import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function PizzaList() {

    const [pizzaList, setPizzaList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => { fetchPizzas() }, []);

    const fetchPizzas = () => {
        axios.get('/api/pizza')
            .then(response => {
                setPizzaList(response.data)
            }).catch((error) => {
                console.log('fetch failed:', error);
            })
    }

    const addPizza = (pizza) => {
        dispatch({ type: 'ADD_PIZZA', payload: pizza.cost })
    }

    const removePizza = (pizza) => {
        dispatch({ type: 'REMOVE_PIZZA', payload: pizza.cost })
    }

    return (
        <>
            <h1>Select Your Pizzas!</h1>
            <hr />
            <div>
                {pizzaList.map((pizza, index) =>
                    <>
                        <p key={index}>{pizza.name},{pizza.description}, {pizza.price}</p>
                        <button onClick={() => dispatch({ type: 'ADD_PIZZA', payload: pizza })}>Add to Cart</button> <button onClick={() => dispatch({ type: 'REMOVE_PIZZA', payload: pizza })}>Remove from Cart</button>
                    </>
                )}


                <div>
                    {pizzaList.map((pizza, index) =>
                        <>
                            <p key={index}>{pizza.name},{pizza.description}, {pizza.price}</p>
                            <button onClick={addPizza(pizza)} >
                                Add to Cart
                            </button>
                            <button onClick={removePizza(pizza)}>Remove from Cart</button>
                        </>
                    )}

                    <h3><button>Next ➡️</button></h3>

                </div>
            </div>
        </>

    )
}

export default PizzaList;