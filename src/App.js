import { Route, Routes } from "react-router";
import "./App.css";
import UserLists from "./Components/UserLists";
import OverViewProfile from "./Components/OverViewProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserLists />} />
        <Route path="/user-profile" element={<OverViewProfile />} />
      </Routes>
    </div>
  );
}

export default App;
