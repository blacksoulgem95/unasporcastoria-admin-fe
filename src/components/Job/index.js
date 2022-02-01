import Card from "../Card";

function Job({job}) {
    console.log('job', job)
    return (
        <>
            <Card title={job.name} body={<p>{job.description}</p>}/>
        </>
    )
}

export default Job