

function App() {
  return (
    <div>
      <section>
      <header className='container'>
        <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',textAlign: 'center',height: '100%',opacity: 1,transition:' opacity 1s ease-in'}} className="container showcase-inner">
            <h1>Welcome to Mitton's Member Management</h1>
            <p>Please login or sign up for a membership</p><br></br>
            <form>
            <p>
                Email: <input id = "email"/>
            </p><br></br>
            <p>
                Password: <input id = "password"/>
            </p>
            <button href="display.html" className="btn">Submit</button>
            <a href="sub.html" className="btn">Sign Up</a>
            </form>
            </div>
        </header>
        </section>
    </div>
  );
}

export default App;
