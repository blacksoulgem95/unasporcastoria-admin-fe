import logo from "../../asset/logo_uss.png"
import logoCoin from "../../asset/logo_circle.png"

function Home() {
    return (
        <>
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title is-flex-container is-justify-content-center">
                        <img src={logoCoin} alt="coin-logo" className="is-inline-block" style={{height: "128px", margin: "auto"}}/>
                    </p>
                    <p className="subtitle is-flex-container is-justify-content-center">
                        <img src={logo} alt="coin-logo" className="is-inline-block" style={{height: "128px", margin: "auto"}}/>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Home;
