import {useState} from "react";
import {ErrorMessage, itemMacroTypeLabel, itemTypeLabel} from "../../asset/messages";
import {useItems} from "../../services/ItemService";
import {ItemMacroType, ItemType} from "../../asset/enums";

function CreateItemModal({active, setActive, reloadCallback}) {
    const [state, setState] = useState({
        name: null,
        description: null,
        price: null,
        sellingPrice: null,
        value: null,
        dots: null,
        max: null,
        bonus: null,
        structPoint: null,
        type: null,
        macroType: null,
        enabled: false,
        isConsumable: false,
        onlyInCreation: false,
    })

    const {state: itemState, createItem} = useItems()

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

    const submit = event => {
        event.preventDefault()
    }

    return (<div className={"modal " + (active ? 'is-active' : '')}>
        <div className="modal-background"/>
        <div className="modal-content">
            <form id="createItemModal" onSubmit={submit} className="card">
                <div className="card-content">
                    <div className="content">

                        {itemState.create_error ? <div className="notification is-danger">
                            <button className="delete" onClick={() => setError(null)}/>
                            {ErrorMessage[itemState.create_error.code] || itemState.create_error.code}
                        </div> : <></>}

                        <h4 className="title">Crea Oggetto</h4>

                        <div className="field">
                            <label className="label">Nome</label>
                            <div className="control">
                                <input name="name" className="input is-primary" required={true}
                                       disabled={itemState.loading}
                                       type="text" placeholder="Sacro Graal" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Descrizione</label>
                            <div className="control">
                                    <textarea name="description" className="input is-primary" required={true}
                                              disabled={itemState.loading} onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Prezzo</label>
                            <div className="control has- has-icons-right">
                                <input name="price" className="input is-primary" required={true}
                                       disabled={itemState.loading}
                                       type="number" step={0.1} placeholder="20" onChange={onChangeInput}/>
                                <span className="icon is-small is-right">
                                        <i className="fas fa-tenge"/>
                                    </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Prezzo di Vendita</label>
                            <div className="control has-icons-right">
                                <input name="sellingPrice" className="input is-primary" required={true}
                                       disabled={itemState.loading}
                                       type="number" step={0.1} placeholder="20" onChange={onChangeInput}/>
                                <span className="icon is-small is-right">
                                        <i className="fas fa-tenge"/>
                                    </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Valore</label>
                            <div className="control has-icons-right">
                                <input name="value" className="input is-primary" required={true}
                                       disabled={itemState.loading}
                                       type="number" step={0.1} placeholder="20" onChange={onChangeInput}/>
                                <span className="icon is-small is-right">
                                        <i className="fas fa-tenge"/>
                                    </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Punti (Dots)</label>
                            <div className="control">
                                <input name="dots" className="input is-primary" required={true}
                                       disabled={itemState.loading}
                                       type="number" step={1} placeholder="5" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Max</label>
                            <div className="control">
                                <input name="max" className="input is-primary" required={true}
                                       disabled={itemState.loading}
                                       type="number" step={1} placeholder="5" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Bonus</label>
                            <div className="control">
                                <input name="bonus" className="input is-primary" required={true}
                                       disabled={itemState.loading}
                                       type="number" step={1} placeholder="5" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Punti Struttura (Struct Point)</label>
                            <div className="control">
                                <input name="structPoint" className="input is-primary" required={true}
                                       disabled={itemState.loading}
                                       type="number" step={1} placeholder="5" onChange={onChangeInput}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Tipo</label>
                            <div className="control">
                                <div className='select is-primary is-fullwidth'>
                                    <select name="type" required onChange={onChangeInput} defaultValue={null}
                                            disabled={itemState.loading}>
                                        <option disabled={true} value={null}> -- Seleziona --</option>
                                        {Object.keys(ItemType).map(k => <option key={k}
                                                                                value={k}>{itemTypeLabel(k)}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Macro Tipo</label>
                            <div className="control">
                                <div className='select is-primary is-fullwidth'>
                                    <select name="macroType" required onChange={onChangeInput} defaultValue={null}
                                            disabled={itemState.loading}>
                                        <option disabled={true} value={null}> -- Seleziona --</option>
                                        {Object.keys(ItemMacroType).map(k => <option key={k}
                                                                                     value={k}>{itemMacroTypeLabel(k)}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <input type="checkbox" name="enabled" className="switch is-success"
                                   disabled={itemState.loading}
                                   checked={state.enabled} onClick={setBoolean}/>
                            <label onClick={setBoolean} htmlFor="enabled">Enabled</label>
                        </div>

                        <div className="field">
                            <input type="checkbox" name="isConsumable" className="switch is-success"
                                   disabled={itemState.loading}
                                   checked={state.isConsumable} onClick={setBoolean}/>
                            <label onClick={setBoolean} htmlFor="isConsumable">Is Consumable</label>
                        </div>

                        <div className="field">
                            <input type="checkbox" name="onlyInCreation" className="switch is-success"
                                   disabled={itemState.loading}
                                   checked={state.onlyInCreation} onClick={setBoolean}/>
                            <label onClick={setBoolean} htmlFor="onlyInCreation">Solo in Creazione</label>
                        </div>

                        <div className="field has-text-centered">
                            <button type="submit" disabled={itemState.loading}
                                    className={"button is-primary " + (itemState.loading ? "is-loading" : "")}>Crea
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setActive(false)}/>
    </div>)
}

export default CreateItemModal;