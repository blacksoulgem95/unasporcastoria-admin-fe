import {useItems} from "../../services/ItemService";
import {useEffect, useState} from "react";
import {defaultPagination} from "../../utils";
import {AdminItem} from "../../components";

function Items() {
    const [initiated, setInitiated] = useState(false)
    const [pagination, setPagination] = useState(defaultPagination())
    const {state: itemsState, getItems} = useItems()

    const updatePagination = p => {
        const newPagination = {...pagination, p}
        setPagination(newPagination)
        getItems(newPagination)
    }

    useEffect(() => {
            if (!initiated) {
                getItems(pagination)
                setInitiated(true)
            }
        }
    )

    return (
        <>
            <section className="section">
                <h1 className="title">Oggetti</h1>
                <div className="columns">
                    {itemsState.items.map(item => (<div key={item.id} className="column is-12-mobile is-6-tablet is-3">
                        <AdminItem item={item}/>
                    </div>))}
                </div>
            </section>
        </>
    );
}

export default Items;
