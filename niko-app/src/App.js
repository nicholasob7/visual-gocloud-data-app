import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {
    Home, Viz2
}
    from './pages';
// import "./style/dark.scss"
// import { useContext } from "react";
// import DarkModeContext from "./context/darkModeContext";




function App() {

    // const { App } = useContext();
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Landing */}
                    <Route path="/" element={(<Home />)} />
                    <Route path="/home" element={(<Home />)} />

                    {/* Pages */}
                    {/* <Route path="/viz1" element={<Viz1 />} /> */}
                    <Route path="/viz2" element={<Viz2 />} />
                    <Route path="/data" element={<International_migration />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;