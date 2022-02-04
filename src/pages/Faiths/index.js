import {useEffect, useState} from "react";
import {defaultPagination} from "../../utils";
import {CreateFaithModal, Faith, Loader} from "../../components";
import {useFaiths} from "../../services/FaithService";
import Pagination from "../../components/Pagination";

function Faiths() {
    const [initiated, setInitiated] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const {state: faithState, getFaiths} = useFaiths()

    const updatePagination = p => {
        let newPagination
        if (faithState?.pagination)
            newPagination = {...faithState?.pagination, ...p}
        else newPagination = {...p}
        getFaiths(newPagination)
    }

    useEffect(() => {
            if (!initiated) {
                getFaiths(defaultPagination())
                setInitiated(true)
            }
        }
    )

    const reloadCallback = () => {
        getFaiths()
    }

    return (
        <>
            <section className="section">
                <div className="is-flex is-align-items-center is-justify-content-space-between">
                    <h1 className="title">Fedi</h1>

                    <div className="">
                        <button onClick={() => setShowCreate(true)} className="button is-primary is-small"><i
                            className="fas fa-plus"/></button>
                    </div>
                </div>
                <div className="columns is-multiline">
                    {faithState.loading ? <div className="column is-12">
                        <Loader/>
                    </div> : <></>}
                    {faithState.loading ? <></> : faithState.faiths?.content?.map(faith => (
                        <div key={faith.id} className="column is-12-mobile is-6-tablet is-3">
                            <Faith faith={faith} callback={reloadCallback}/>
                        </div>))}
                </div>
                <div className="is-flex is-align-items-center is-justify-content-center">
                    <Pagination data={faithState.faiths} doSearch={updatePagination} />
                </div>
            </section>
            <CreateFaithModal active={showCreate} setActive={setShowCreate} reloadCallback={reloadCallback}/>
        </>
    );
}

export default Faiths;
