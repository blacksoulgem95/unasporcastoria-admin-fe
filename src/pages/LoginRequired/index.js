import logoCoin from "../../asset/logo_circle.png"

function LoginRequired() {
    return (
        <>
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title is-flex-container is-justify-content-center">
                        <img src={logoCoin} alt="coin-logo" className="is-inline-block"
                             style={{height: "128px", margin: "auto"}}/>
                    </p>
                    <h1 className="Title">Devi effettuare l'accesso per vedere questa pagina.</h1>
                </div>
            </section>
        </>
    );
}

export default LoginRequired;
