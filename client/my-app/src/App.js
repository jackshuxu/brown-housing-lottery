import logo from './logo.svg';
import './App.css';
import SignInSide from './SignInSide';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthContextProvider>
          <SignInSide />
        </AuthContextProvider>
      </header>
    </div>
  );
}

export default App;
