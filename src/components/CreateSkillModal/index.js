import {useState} from "react";
import {ErrorMessage} from "../../common/messages";
import {useSkills} from "../../services/SkillService";

function CreateSkillModal({active, setActive, reloadCallback}) {
    const [state, setState] = useState({
        name: null,
        description: null,
        limitSpouses: 1
    })

    const {state: skillsState, createSkill} = useSkills()

    const onChangeInput = event => {
        const newState = {...state}
        newState[event.target.name] = event.target.value
        setState(newState)
    }

    const submit = async event => {
        event.preventDefault()
        createSkill(state, reloadCallback)
        setActive(false)
    }

    return (<div className={"modal " + (active ? 'is-active' : '')}>
        <div className="modal-background"/>
        <div className="modal-content">
            <form id="createItemModal" onSubmit={submit} className="card parchment">
                <div className="card-content">
                    <div className="content">

                        {skillsState.create_error ? <div className="notification is-danger">
                            <button className="delete" onClick={() => setError(null)}/>
                            {ErrorMessage[skillsState.create_error.code] || skillsState.create_error.code}
                        </div> : <></>}

                        <h4 className="title">Crea Abilità</h4>

                        <div className="field">
                            <label className="label">Nome</label>
                            <div className="control">
                                <input name="name" className="input is-primary" required={true}
                                       disabled={skillsState.loading}
                                       type="text" placeholder="Pastafarianesimo" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Descrizione</label>
                            <div className="control">
                                    <textarea name="description1" className="input is-primary" required={true}
                                              disabled={skillsState.loading}
                                              placeholder="Viva il grandioso spaghetto volante"
                                              onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Info Addizionali</label>
                            <div className="control">
                                    <textarea name="description2" className="input is-primary" required={true}
                                              disabled={skillsState.loading}
                                              placeholder="Viva il grandioso spaghetto volante"
                                              onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field has-text-centered">
                            <button type="submit" disabled={skillsState.loading}
                                    className={"button is-primary " + (skillsState.loading ? "is-loading" : "")}>Crea
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setActive(false)}/>
    </div>)
}

export default CreateSkillModal;