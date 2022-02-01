import Card from "../Card";

function Faith({faith}) {
    return (
        <>
            <Card title={faith.name} body={<p>{faith.description}</p>}/>
        </>
    )
}

export default Faith