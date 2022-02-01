import Card from "../Card";

function AdminItem({item}) {
    return (
        <>
            <>
                <Card title={item.name} body={<p>{item.description}</p>}/>
            </>
        </>
    )
}

export default AdminItem