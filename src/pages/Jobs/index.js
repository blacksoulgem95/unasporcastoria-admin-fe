import {useEffect, useState} from "react";
import {defaultPagination} from "../../utils";
import {Job} from "../../components";
import {useJobs} from "../../services/JobService";
import CreateJobModal from "../../components/CreateJobModal";

function Jobs() {
    const [initiated, setInitiated] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [pagination, setPagination] = useState(defaultPagination())
    const {state: jobsState, getJobs} = useJobs()

    const updatePagination = p => {
        const newPagination = {...pagination, p}
        setPagination(newPagination)
        getJobs(newPagination)
    }

    useEffect(() => {
            if (!initiated) {
                getJobs(pagination)
                setInitiated(true)
            }
        }
    )

    const reloadCallback = () => {
        useEffect(() => {
            getJobs(pagination)
        })
    }

    return (
        <>
            <section className="section">
                <div className="is-flex is-align-items-center is-justify-content-space-between">
                    <h1 className="title">Lavori</h1>

                    <div className="">
                        <button onClick={() => setShowCreate(true)} className="button is-primary is-small"><i
                            className="fas fa-plus"/></button>
                    </div>
                </div>
                <div className="columns is-multiline">
                    {jobsState.jobs?.content?.map(job => (
                        <div key={job.id} className="column is-12-mobile is-6-tablet is-3">
                            <Job job={job}/>
                        </div>))}
                </div>
            </section>
            <CreateJobModal active={showCreate} setActive={setShowCreate} reloadCallback={reloadCallback}/>
        </>
    );
}

export default Jobs;
