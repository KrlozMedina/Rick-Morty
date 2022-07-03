import './App.css';
import Header from './components/Header';
import Characters from './components/Characters';
import './styles/global.css'

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
