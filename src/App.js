import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body>
      <div class="container">
        <div id="login">
          <h1>This is an example of the Authorization Code flow</h1>
          <a href="https://localhost:8888/login" class="btn btn-primary">Log in with Spotify</a>
        </div>
        <div id="loggedin">
          <div id="user-profile"></div>
          <div id="oauth"></div>
          <button class="btn btn-default" id="obtain-new-token">
            Obtain new token using the refresh token
          </button>
        </div>
      </div>
    </body>
  );
}

export default App;
