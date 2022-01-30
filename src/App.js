import {Home, NoMatch} from "./pages";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthenticatedRoute, Navbar} from "./components";
import Items from "./pages/Items";
import 'bulma-extensions/dist/js/bulma-extensions'
import {AuthContextProvider} from "./context/auth.context";

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Navbar/>
                <div id="page">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/items" element={<AuthenticatedRoute component={Items}/>}/>
                        <Route path="*" element={<NoMatch/>}/>
                    </Routes>
                </div>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
