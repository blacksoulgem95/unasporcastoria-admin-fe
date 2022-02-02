import Card from "../Card";
import {useFaiths} from "../../services/FaithService";

function Faith({faith}) {
    const {state, deleteFaith} = useFaiths()

    const buttons = [
        {action: () => deleteFaith(faith.id), label: "Elimina", loading: state.loading}
    ]

    return (
        <>
            <Card title={faith.name}
                  body={<p>{faith.description}</p>}
                  buttons={buttons}
            />
        </>
    )
}

export default Faith