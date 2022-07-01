import './App.css'
import {Header} from "./header/header";
import {Content} from "./content/content";
import {Footer} from "./footer/footer";

function App() {
    return (
        <div className="wrap">
            <Header/>
            <Content />
            <Footer />
        </div>
    );
}

export default App;
