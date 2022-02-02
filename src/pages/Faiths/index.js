import {useEffect, useState} from "react";
import {defaultPagination} from "../../utils";
import {CreateFaithModal, Faith} from "../../components";
import {useFaiths} from "../../services/FaithService";

function Faiths() {
    const [initiated, setInitiated] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [pagination, setPagination] = useState(defaultPagination())
    const {state: faithState, getFaiths} = useFaiths()

    const updatePagination = p => {
        const newPagination = {...pagination, p}
        setPagination(newPagination)
        getFaiths(newPagination)
    }

    useEffect(() => {
            if (!initiated) {
                getFaiths(pagination)
                setInitiated(true)
            }
        }
    )

    const reloadCallback = () => {
        getFaiths(pagination)
    }

    return (
        <>
            <section className="section">
                <div className="is-flex is-align-items-center is-justify-content-space-between">
                    <h1 className="title">Credi religiosi</h1>

                    <div className="">
                        <button onClick={() => setShowCreate(true)} className="button is-primary is-small"><i
                            className="fas fa-plus"/></button>
                    </div>
                </div>
                <div className="columns is-multiline">
                    {faithState.faiths?.content?.map(faith => (
                        <div key={faith.id} className="column is-12-mobile is-6-tablet is-3">
                            <Faith faith={faith} callback={reloadCallback}/>
                        </div>))}
                </div>
            </section>
            <CreateFaithModal active={showCreate} setActive={setShowCreate} reloadCallback={reloadCallback}/>
        </>
    );
}

export default Faiths;
