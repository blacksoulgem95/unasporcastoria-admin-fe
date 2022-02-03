import {useItems} from "../../services/ItemService";
import {useEffect, useState} from "react";
import {defaultPagination} from "../../utils";
import {AdminItem, CreateItemModal, Loader} from "../../components";

function Items() {
    const [initiated, setInitiated] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
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

    const reloadCallback = () => {
        getItems(pagination)
    }

    return (
        <>
            <section className="section">
                <div className="is-flex is-align-items-center is-justify-content-space-between">
                    <h1 className="title">Oggetti</h1>

                    <div className="">
                        <button onClick={() => setShowCreate(true)} className="button is-primary is-small"><i
                            className="fas fa-plus"/></button>
                    </div>
                </div>
                <div className="columns is-multiline">
                    {itemsState.loading ? <div className="column is-12">
                        <Loader/>
                    </div> : <></>}
                    {itemsState.loading ? <></> : itemsState.items?.content?.map(item => (
                        <div key={item.id} className="column is-12-mobile is-6-tablet is-3">
                            <AdminItem item={item} callback={reloadCallback}/>
                        </div>))}
                </div>
            </section>
            <CreateItemModal active={showCreate} setActive={setShowCreate} reloadCallback={reloadCallback}/>
        </>
    );
}

export default Items;
