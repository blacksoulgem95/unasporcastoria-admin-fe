import {useState} from "react";

function sorter({pagination, fields, setPagination}) {

    const setSort = event => {
        const p = {}
        p[event.target.name] = event.target.value
        setPagination(p)
    }

    const [name, setName] = useState('')

    return (
        <>
            <div className="select">
                <select name="sort" onChange={setSort}>
                    {fields.map(f => <option key={f.id} value={f.id}
                                             selected={f.id === pagination?.sort}>{f.label}</option>)}
                </select>
            </div>

            <div className="select">
                <select name="direction" onChange={setSort}>
                    <option value="asc" selected={pagination?.direction === 'asc'}>Ascendente</option>
                    <option value="desc" selected={pagination?.direction === 'desc'}>Discendente</option>
                </select>
            </div>

            <div className="field is-flex is-justify-content-end is-align-items-center">
                <div className="control">
                    <input name="name" className="input" type="text" defaultValue={name}
                           onChange={e => setName(e.target.value)} placeholder="Filtra per nome"/>
                </div>
                <button onClick={() => setPagination({'name': name})} className="button is-primary"><i
                    className="fas fa-search"/></button>
            </div>

        </>
    )
}

export default sorter