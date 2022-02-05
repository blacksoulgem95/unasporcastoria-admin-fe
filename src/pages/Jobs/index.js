import {useEffect, useState} from "react";
import {defaultPagination} from "../../utils";
import {Job, Loader} from "../../components";
import {useJobs} from "../../services/JobService";
import CreateJobModal from "../../components/CreateJobModal";
import Pagination from "../../components/Pagination";

function Jobs() {
    const [initiated, setInitiated] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const {state: jobsState, getJobs} = useJobs()


    const updatePagination = p => {
        let newPagination
        if (jobsState?.pagination)
            newPagination = {...jobsState?.pagination, ...p}
        else newPagination = {...p}
        getJobs(newPagination)
    }

    useEffect(() => {
            if (!initiated) {
                getJobs(defaultPagination())
                setInitiated(true)
            }
        }
    )

    const reloadCallback = () => {
        getJobs()
    }

    return (
        <>
            <section className="section">
                <div className="is-flex is-align-items-center is-justify-content-space-between">
                    <h1 className="title">Mestiere</h1>

                    <div className="">
                        <button onClick={() => setShowCreate(true)} className="button is-primary is-small"><i
                            className="fas fa-plus"/></button>
                    </div>
                </div>
                <div className="columns is-multiline">
                    {jobsState.loading ? <div className="column is-12">
                        <Loader/>
                    </div> : <></>}
                    {jobsState.loading ? <></> : jobsState.jobs?.content?.map(job => (
                        <div key={job.id} className="column is-12-mobile is-6-tablet is-4-desktop">
                            <Job job={job} callback={reloadCallback}/>
                        </div>))}
                </div>
                <div className="is-flex is-align-items-center is-justify-content-center">
                    <Pagination data={jobsState.jobs} doSearch={updatePagination} />
                </div>
            </section>
            <CreateJobModal active={showCreate} setActive={setShowCreate} reloadCallback={reloadCallback}/>
        </>
    );
}

export default Jobs;
