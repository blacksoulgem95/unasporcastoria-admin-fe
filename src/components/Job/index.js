import Card from "../Card";
import {useJobs} from "../../services/JobService";
import {yesNo} from "../../utils/boolean";

function Job({job, callback}) {

    const {state, deleteJob} = useJobs()

    const buttons = [
        {action: () => deleteJob(job.id, callback), label: "Elimina", loading: state.loading}
    ]

    const body = () => {
        return (<>
                <p>{job.description}</p>
                <p><b>Citazione:</b> {job.cite}</p>
                <p><b>Può sposarsi?</b> {yesNo(job.canMarry)}</p>
            </>
        )
    }

    return (
        <>
            <Card title={job.name}
                  body={body()}
                  buttons={buttons}
            />
        </>
    )
}

export default Job