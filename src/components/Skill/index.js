import Card from "../Card";
import {useSkills} from "../../services/SkillService";
import {label} from "../../utils";

function Skill({skill, callback}) {

    const {state, deleteSkill} = useSkills()

    const buttons = [
        {action: () => alert('Work in progress'), label: label('fas fa-folder-open', 'Apri'), loading: state.loading},
        {action: () => alert('Work in progress'), label: label('fas fa-pencil-alt', 'Modifica'), loading: state.loading},
        {action: () => deleteSkill(skill.id, callback), label:  label('fas fa-trash', 'Elimina'), loading: state.loading}
    ]

    const body = () => {
        return (<>
                <p>{skill.description1}</p>
                <p><b>Info Addizionali:</b> {skill.description2}</p>
            </>
        )
    }

    return (
        <>
            <Card title={`${skill.name} - ID ${skill.id}`}
                  body={body()}
                  buttons={buttons}
            />
        </>
    )
}

export default Skill