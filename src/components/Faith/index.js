import Card from "../Card";
import {useFaiths} from "../../services/FaithService";

function Faith({faith, callback}) {
    const {state, deleteFaith} = useFaiths()

    const buttons = [
        {action: () => deleteFaith(faith.id, callback), label: "Elimina", loading: state.loading}
    ]

    const body = () => {
        return (<div>
            <p>{faith.description}</p>
            <p><b>Limite mogli:</b> {faith.limitSpouses}</p>
        </div>)
    }

    return (
        <>
            <Card title={faith.name}
                  body={body()}
                  buttons={buttons}
            />
        </>
    )
}

export default Faith