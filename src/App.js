import './App.css';
import { UseState } from "./Components/UseState/UseState";
import { ClassState } from "./Components/ClassState/ClassState";

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <ClassState name="ClassState" />
    </div>
  );
}

export default App;
