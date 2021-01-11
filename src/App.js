import {useState} from 'react';
import './App.css';
import Students from './components/Students';
import Loader from './components/Loader';

function App() {

  const [loader, setLoader] = useState(false);

  return (
    <div className="App">
      {loader ? <Loader /> : ""}
      <Students setLoader={setLoader}/>
    </div>
  );
}

export default App;
