import {useItems} from "../../services/ItemService";
import {useEffect, useState} from "react";
import {defaultPagination} from "../../utils";
import {AdminItem, CreateItemModal, Loader} from "../../components";
import Pagination from "../../components/Pagination";

function Items() {
    const [initiated, setInitiated] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const {state: itemsState, getItems} = useItems()

    const updatePagination = p => {
        let newPagination
        if (itemsState?.pagination)
            newPagination = {...itemsState?.pagination, ...p}
        else newPagination = {...p}
        getItems(newPagination)
    }

    useEffect(() => {
            if (!initiated) {
                getItems(defaultPagination())
                setInitiated(true)
            }
        }
    )

    const reloadCallback = () => {
        getItems()
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
                        <div key={item.id} className="column is-12-mobile is-6-tablet is-4-desktop">
                            <AdminItem item={item} callback={reloadCallback}/>
                        </div>))}
                </div>
                <div className="is-flex is-align-items-center is-justify-content-center">
                    <Pagination data={itemsState.items} doSearch={updatePagination}/>
                </div>
            </section>
            <CreateItemModal active={showCreate} setActive={setShowCreate} reloadCallback={reloadCallback}/>
        </>
    );
}

export default Items;
