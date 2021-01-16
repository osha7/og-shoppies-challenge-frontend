import './css/App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './containers/Search';
import Nominations from './containers/Nominations';
import Main from './containers/Main';

function App() {

  
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Main} />
        <Route exact path="/nominations" component={Nominations} />
        <Route exact path="/search" component={Search} />
      </div>
    </Router>
  );
}

export default App;
