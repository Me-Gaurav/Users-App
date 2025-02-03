import Navbar from "./components/Navbar";
import Users from "./components/Users";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <Navbar />


      {/* Content */}
      <div className="flex-grow-1 py-4 px-4">
        <Users />
      </div>
    </div>
  );
}

export default App;
