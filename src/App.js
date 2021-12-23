import {Home, NoMatch} from "./pages";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Navbar} from "./components";

function App() {
    return (
        <Router>
            <Navbar />
            <div id="page">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
