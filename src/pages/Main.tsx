import Task from "./Kategori";
import Appbar from "../components/Appbar";

function Main() {
  return (
    <div className="App">
      <Appbar />
      <div
        className="body"
        style={{
          marginTop: "70px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Task />
      </div>
    </div>
  );
}

export default Main;
