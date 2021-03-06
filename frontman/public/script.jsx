var Signup = React.createClass({
    render: function() {
        return(
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
        );
    },
    fetch(uri)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log( data );
    })
    .catch(function(err){
        //error handling network request
    })
});

React.render(<Signup/>, document.getElementById("root"));