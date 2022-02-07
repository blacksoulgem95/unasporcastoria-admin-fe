import Card from "../Card";
import {useFaiths} from "../../services/FaithService";
import {label} from "../../utils/utils";
import {ShortText} from "../index";

function Faith({faith, callback}) {
    const {state, deleteFaith} = useFaiths()

    const buttons = [
        {action: () => alert('Work in progress'), label: label('fas fa-folder-open', 'Apri'), loading: state.loading},
        {action: () => alert('Work in progress'), label: label('fas fa-pencil-alt', 'Modifica'), loading: state.loading},
        {action: () => deleteFaith(faith.id, callback), label:  label('fas fa-trash', 'Elimina'), loading: state.loading}
    ]

    const body = () => {
        return (<div>
            <p><ShortText text={faith.description}/></p>
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