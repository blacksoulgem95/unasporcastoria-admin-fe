import Card from "../Card";
import {useJobs} from "../../services/JobService";

function Job({job, callback}) {

    const {state, deleteJob} = useJobs()

    const buttons = [
        {action: () => deleteJob(job.id, callback), label: "Elimina", loading: state.loading}
    ]

    return (
        <>
            <Card title={job.name}
                  body={<p>{job.description}</p>}
                  buttons={buttons}
            />
        </>
    )
}

export default Job