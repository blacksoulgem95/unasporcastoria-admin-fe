import {Home, NoMatch} from "./pages";
import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom';
import {AuthenticatedRoute, Navbar} from "./components";
import Items from "./pages/Items";
import 'bulma-extensions/dist/js/bulma-extensions'
import {AuthContextProvider} from "./context/auth.context";
import Jobs from "./pages/Jobs";
import Faiths from "./pages/Faiths";
import {AnimatePresence, motion} from "framer-motion";
import Skills from "./pages/Skills";

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Navbar/>
                <div id="page">
                    <AnimatePresence exitBeforeEnter>
                        <Routes location={location} key={location.pathname}>
                            <Route element={<Wrapper/>}>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/items" element={<AuthenticatedRoute component={Items}/>}/>
                                <Route path="/jobs" element={<AuthenticatedRoute component={Jobs}/>}/>
                                <Route path="/faiths" element={<AuthenticatedRoute component={Faiths}/>}/>
                                <Route path="/skills" element={<AuthenticatedRoute component={Skills}/>}/>
                                <Route path="*" element={<NoMatch/>}/>
                            </Route>
                        </Routes>
                    </AnimatePresence>
                </div>
            </Router>
        </AuthContextProvider>
    );
}

export const Wrapper = () => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={{
                initial: {
                    opacity: 0
                },
                in: {
                    opacity: 1
                },
                out: {
                    opacity: 0
                }
            }}
            transition={{
                type: "spring",
                damping: 10,
                stiffness: 50
            }}
        >
            <Outlet/>
        </motion.div>
    );
};


export default App;
