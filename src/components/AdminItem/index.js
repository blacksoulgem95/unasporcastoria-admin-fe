import Card from "../Card";
import {useItems} from "../../services/ItemService";
import {label} from "../../utils";

function AdminItem({item, callback}) {

    const {state, deleteItem} = useItems()

    const buttons = [
        {action: () => alert('Work in progress'), label: label('fas fa-folder-open', 'Apri'), loading: state.loading},
        {action: () => alert('Work in progress'), label: label('fas fa-pencil-alt', 'Modifica'), loading: state.loading},
        {action: () => deleteItem(item.id, callback), label:  label('fas fa-trash', 'Elimina'), loading: state.loading}
    ]
    return (
        <>
            <>
                <Card title={item.name}
                      body={<p>{item.description}</p>}
                      buttons={buttons}
                />
            </>
        </>
    )
}

export default AdminItem