import {Home, NoMatch} from "./pages";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Navbar, AuthenticatedRoute} from "./components";
import Items from "./pages/Items";
import 'bulma-extensions/dist/js/bulma-extensions'

function App() {
    return (
        <Router>
            <Navbar/>
            <div id="page">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <AuthenticatedRoute path="/items" element={<Items/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
