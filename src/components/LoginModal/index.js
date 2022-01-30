import React, {useState} from 'react'
import {getAuth} from "@firebase/auth";
import {ErrorMessage} from "../../asset/messages";

function LoginModal({active, setActive}) {

    const [state, setState] = useState({email: null, password: null})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onChangeInput = event => {
        const newState = {...state}
        newState[event.target.name] = event.target.value
        setState(newState)
    }

    const doLogin = async () => {
        if (!!state.email && !!state.password) {
            try {
                await getAuth().signInWithEmailAndPassword(state.email, state.password)
                setActive(false)
            } catch (error) {
                console.dir(error)
                setError(error)
            }
        }
    }

    const submit = (event) => {
        event.preventDefault()
        setLoading(true)
        doLogin().then(() => setLoading(false))
        return false
    }

    return (
        <div className={"modal " + (active ? 'is-active' : '')}>
            <div className="modal-background"/>
            <div className="modal-content">
                <form id="loginModal" onSubmit={submit} className="card">
                    <div className="card-content">
                        <div className="content">

                            {error ?
                                <div className="notification is-danger">
                                    <button className="delete" onClick={() => setError(null)}/>
                                    {ErrorMessage[error.code] || error.code}
                                </div> : <></>}


                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input name="email" className="input is-primary" required={true} disabled={loading}
                                           type="email" placeholder="your@mail.com" onChange={onChangeInput}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"/>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input name="password" className="input is-primary" required={true}
                                           disabled={loading}
                                           type="password" placeholder="MyS3cr3t#" onChange={onChangeInput}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"/>
                                    </span>
                                </div>
                            </div>

                            <div className="field has-text-centered">
                                <button type="submit" disabled={loading}
                                        className={"button is-primary " + (loading ? "is-loading" : "")}>Login
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => setActive(false)}/>
        </div>
    )
}

export default LoginModal