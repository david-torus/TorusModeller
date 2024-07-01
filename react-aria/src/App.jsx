import "./App.css";

function App() {
  return (
    <>
      <div className="text-4xl text-red-600"> Hello world</div>
      <Button onPress={() => alert("Hello world!")}>Press me</Button>
    </>
  );
}

export default App;
