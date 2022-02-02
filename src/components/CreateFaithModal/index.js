import {useState} from "react";
import {ErrorMessage} from "../../asset/messages";
import {useFaiths} from "../../services/FaithService";

function CreateFaithModal({active, setActive, reloadCallback}) {
    const [state, setState] = useState({
        name: null,
        description: null,
        limitSpouses: 1
    })

    const {state: faithsState, createFaith} = useFaiths()

    const onChangeInput = event => {
        const newState = {...state}
        newState[event.target.name] = event.target.value
        setState(newState)
    }

    const submit = async event => {
        event.preventDefault()
        createFaith(state, reloadCallback)
        setActive(false)
    }

    return (<div className={"modal " + (active ? 'is-active' : '')}>
        <div className="modal-background"/>
        <div className="modal-content">
            <form id="createItemModal" onSubmit={submit} className="card">
                <div className="card-content">
                    <div className="content">

                        {faithsState.create_error ? <div className="notification is-danger">
                            <button className="delete" onClick={() => setError(null)}/>
                            {ErrorMessage[faithsState.create_error.code] || faithsState.create_error.code}
                        </div> : <></>}

                        <h4 className="title">Crea Credo</h4>

                        <div className="field">
                            <label className="label">Nome</label>
                            <div className="control">
                                <input name="name" className="input is-primary" required={true}
                                       disabled={faithsState.loading}
                                       type="text" placeholder="Pastafarianesimo" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Descrizione</label>
                            <div className="control">
                                    <textarea name="description" className="input is-primary" required={true}
                                              disabled={faithsState.loading}
                                              placeholder="Viva il grandioso spaghetto volante"
                                              onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Limite di Mogli</label>
                            <div className="control">
                                <input name="limitSpouses" className="input is-primary" required={true}
                                       disabled={faithsState.loading}
                                       type="number" step={1} placeholder="1" defaultValue={1}
                                       onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field has-text-centered">
                            <button type="submit" disabled={faithsState.loading}
                                    className={"button is-primary " + (faithsState.loading ? "is-loading" : "")}>Crea
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setActive(false)}/>
    </div>)
}

export default CreateFaithModal;