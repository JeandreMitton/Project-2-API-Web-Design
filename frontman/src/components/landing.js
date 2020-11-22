import React from 'react';
import {useEffects, useStates} from 'react';

export const Landing = () => {
    const [initialState, setInitialState] = useState([])

    render(
        <div>
            <header class="showcase">
                <div class="container showcase-inner">
                    <h1>Welcome to Mitton's Member Management</h1>
                    <p>Please login or sign up for a membership</p><br></br>
                    <p>Email: <input id = "email"/></p><br></br>
                    <p>Password: <input id = "password"/></p>
                    <button href="display.html" class="btn">Submit</button>
                    <a href="sub.html" class="btn">Sign Up</a>
                </div>
            </header>
        </div>
    ),
    useEffect(()=> {
        fetch('/api/').then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setInitialState(jsonResponse))
    },[])

    console.log(initialState)
    return(<div>
        {initialState.length > 0 && initialState.map((e,i) => <li key={i}>{e}</li>)}
    </div>)
}