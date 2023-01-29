import Header from './components/Header';
import Characters from './components/Characters';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <section>
        <Characters />
      </section>
    </div>
  );
}

export default App;
