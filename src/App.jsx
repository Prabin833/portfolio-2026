import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import useLenis  from "./hooks/useLenis"

function App() {
  useLenis();
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Contact />
    </>
  );
}

export default App;