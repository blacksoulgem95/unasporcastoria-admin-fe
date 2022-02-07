import {useState} from "react";
import {ErrorMessage} from "../../common/messages";
import {useJobs} from "../../services/JobService";

function CreateJobModal({active, setActive, reloadCallback}) {
    const [state, setState] = useState({
        name: null,
        description: null,
        cite: null,
        canMarry: true,
        level: 1
    })

    const {state: jobsState, createJob} = useJobs()

    const onChangeInput = event => {
        const newState = {...state}
        newState[event.target.name] = event.target.value
        setState(newState)
    }
    const setBoolean = event => {
        const newState = {...state}
        newState[event.target.htmlFor] = !state[event.target.htmlFor]
        setState(newState)
    }

    const submit = async event => {
        event.preventDefault()
        createJob(state, reloadCallback)
        setActive(false)
    }

    return (<div className={"modal " + (active ? 'is-active' : '')}>
        <div className="modal-background"/>
        <div className="modal-content">
            <form id="createItemModal" onSubmit={submit} className="card parchment">
                <div className="card-content">
                    <div className="content">

                        {jobsState.create_error ? <div className="notification is-danger">
                            <button className="delete" onClick={() => setError(null)}/>
                            {ErrorMessage[jobsState.create_error.code] || jobsState.create_error.code}
                        </div> : <></>}

                        <h4 className="title">Crea Mestiere</h4>

                        <div className="field">
                            <label className="label">Nome</label>
                            <div className="control">
                                <input name="name" className="input is-primary" required={true}
                                       disabled={jobsState.loading}
                                       type="text" placeholder="Professional organizer" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Descrizione</label>
                            <div className="control">
                                    <textarea name="description" className="input is-primary" required={true}
                                              disabled={jobsState.loading} placeholder="La Marie Kondo medievale"
                                              onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Cite</label>
                            <div className="control">
                                    <textarea name="cite" className="input is-primary" required={false}
                                              disabled={jobsState.loading}
                                              placeholder="Non so cosa sia questo campo ma c'era"
                                              onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Livello Sociale</label>
                            <div className="control">
                                <input type="number" step={1} min={1} max={5} name="level" className="input is-primary"
                                       required={true} defaultValue={state.level}
                                       disabled={jobsState.loading} placeholder="2"
                                       onChange={onChangeInput}/>
                            </div>
                        </div>


                        <div className="field">
                            <input type="checkbox" name="canMarry" className="switch is-success"
                                   disabled={jobsState.loading}
                                   checked={state.canMarry} onClick={setBoolean}/>
                            <label onClick={setBoolean} htmlFor="canMarry">Può sposarsi</label>
                        </div>

                        <div className="field has-text-centered">
                            <button type="submit" disabled={jobsState.loading}
                                    className={"button is-primary " + (jobsState.loading ? "is-loading" : "")}>Crea
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setActive(false)}/>
    </div>)
}

export default CreateJobModal;