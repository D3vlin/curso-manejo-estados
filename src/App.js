import './App.css';
import { UseState } from "./Components/UseState/UseState";
import { ClassState } from "./Components/ClassState/ClassState";
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <ClassState name="ClassState" />
      <UseReducer name="UseReducer" />
    </div>
  );
}

export default App;
