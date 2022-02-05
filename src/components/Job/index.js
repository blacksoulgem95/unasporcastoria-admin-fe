import Card from "../Card";
import {useJobs} from "../../services/JobService";
import {yesNo} from "../../utils/boolean";
import UpdateJobModal from "../UpdateJobModal";
import {useState} from "react";

function Job({job, callback}) {

    const {state, deleteJob} = useJobs()
    const [update, setUpdate] = useState(false)

    const buttons = [
        {action: () => deleteJob(job.id, callback), label: "Elimina", loading: state.loading},
        {action: () => setUpdate(true), label: "Aggiorna", loading: state.loading}
    ]

    const body = () => {
        return (<>
                <p>{job.description}</p>
                <p><b>Citazione:</b> {job.cite}</p>
                <p><b>Livello Sociale:</b> {job.level}</p>
                <p><b>Può sposarsi?</b> {yesNo(job.canMarry)}</p>
            </>
        )
    }

    return (
        <>
            <Card title={`${job.name} - ID ${job.id}`}
                  body={body()}
                  buttons={buttons}
            />
            {update ? <UpdateJobModal job={job} active={update} setActive={setUpdate} reloadCallback={callback}/> : <></>}
        </>
    )
}

export default Job