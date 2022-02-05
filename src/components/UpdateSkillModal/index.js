import {useState} from "react";
import {ErrorMessage} from "../../asset/messages";
import {useSkills} from "../../services/SkillService";

function UpdateSkillModal({skill, active, setActive, reloadCallback}) {
    const [state, setState] = useState({...skill})
    const [error, setError] = useState(null)

    const {state: skillsState, updateSkill} = useSkills()

    const onChangeInput = event => {
        const newState = {...state}
        newState[event.target.name] = event.target.value
        setState(newState)
    }

    const submit = async event => {
        event.preventDefault()
        updateSkill(state, reloadCallback).then(() => setActive(false)).catch(setError)
    }

    return (<div className={"modal " + (active ? 'is-active' : '')}>
        <div className="modal-background"/>
        <div className="modal-content">
            <form id="updateItemModal" onSubmit={submit} className="card parchment">
                <div className="card-content">
                    <div className="content">

                        {error ? <div className="notification is-danger">
                            <button className="delete" onClick={() => setError(null)}/>
                            {ErrorMessage[error.code] || error.code}
                        </div> : <></>}

                        <h4 className="title">Modifica Abilità - ID {skill.id}</h4>

                        <div className="field">
                            <label className="label">Nome</label>
                            <div className="control">
                                <input name="name" className="input is-primary" required={true}
                                       disabled={skillsState.loading} defaultValue={state.name}
                                       type="text" placeholder="Pastafarianesimo" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Descrizione</label>
                            <div className="control">
                                    <textarea name="description1" className="input is-primary" required={true}
                                              disabled={skillsState.loading} defaultValue={state.description1}
                                              placeholder="Viva il grandioso spaghetto volante"
                                              onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Info Addizionali</label>
                            <div className="control">
                                    <textarea name="description2" className="input is-primary" required={true}
                                              disabled={skillsState.loading} defaultValue={state.description2}
                                              placeholder="Viva il grandioso spaghetto volante"
                                              onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field has-text-centered">
                            <button type="submit" disabled={skillsState.loading}
                                    className={"button is-primary " + (skillsState.loading ? "is-loading" : "")}>Aggiorna
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setActive(false)}/>
    </div>)
}

export default UpdateSkillModal;