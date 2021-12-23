import logo from "../../asset/logo_uss.png"
import logoCoin from "../../asset/logo_circle.png"

function Home() {
    return (
        <>
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title ">
                        <figure className="image is-1by1 is-flex-container is-justify-content-center">
                            <img src={logoCoin} alt="coin-logo" style={{height: "128px", margin: "auto"}}/>
                        </figure>
                    </p>
                    <p className="subtitle">
                        <figure className="image is-16by9 is-flex-container is-justify-content-center">
                            <img src={logo} alt="coin-logo" style={{height: "128px", margin: "auto"}}/>
                        </figure>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Home;
