import {useState} from "react";
import {ErrorMessage} from "../../asset/messages";
import {useJobs} from "../../services/JobService";

function UpdateJobModal({active, setActive, job, reloadCallback}) {
    const [state, setState] = useState({
        ...job
    })

    const {state: jobsState, updateJob, dismissUpdateFailure} = useJobs()

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
        updateJob(state, reloadCallback).then(() => setActive(false))
    }

    return (<div className={"modal " + (active ? 'is-active' : '')}>
        <div className="modal-background"/>
        <div className="modal-content">
            <form id="createItemModal" onSubmit={submit} className="card">
                <div className="card-content">
                    <div className="content">

                        {jobsState.update_error ? <div className="notification is-danger">
                            <button className="delete" onClick={() => dismissUpdateFailure()}/>
                            {ErrorMessage[jobsState.update_error.code] || jobsState.update_error.code}
                        </div> : <></>}

                        <h4 className="title">Aggiorna mestiere - ID {state.id}</h4>

                        <div className="field">
                            <label className="label">Nome</label>
                            <div className="control">
                                <input name="name" className="input is-primary" required={true}
                                       disabled={jobsState.loading} defaultValue={state.name}
                                       type="text" placeholder="Professional organizer" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Descrizione</label>
                            <div className="control">
                                    <textarea name="description" className="input is-primary" required={true}
                                              defaultValue={state.description}
                                              disabled={jobsState.loading} placeholder="La Marie Kondo medievale"
                                              onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Citazione</label>
                            <div className="control">
                                    <textarea name="cite" className="input is-primary" required={false}
                                              disabled={jobsState.loading} defaultValue={state.cite}
                                              placeholder="Che sia un maniero o un pozzo, a posto lo rimetto"
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
                                    className={"button is-primary " + (jobsState.loading ? "is-loading" : "")}>Aggiorna
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setActive(false)}/>
    </div>)
}

export default UpdateJobModal;