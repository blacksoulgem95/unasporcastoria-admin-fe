import Card from "../Card";
import {useItems} from "../../services/ItemService";

function AdminItem({item}) {

    const {state, deleteItem} = useItems()

    const buttons = [
        {action: () => deleteItem(item.id), label: "Elimina", loading: state.loading}
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