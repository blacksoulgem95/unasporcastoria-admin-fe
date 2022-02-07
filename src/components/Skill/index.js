import Card from "../Card";
import {useSkills} from "../../services/SkillService";
import {label} from "../../utils/utils";
import UpdateSkillModal from "../UpdateSkillModal";
import {useState} from "react";
import {ShortText} from "../index";

function Skill({skill, callback}) {

    const {state, deleteSkill} = useSkills()
    const [update, setUpdate] = useState(false)

    const buttons = [
        {action: () => alert('Work in progress'), label: label('fas fa-folder-open', 'Apri'), loading: state.loading},
        {
            action: () => setUpdate(true),
            label: label('fas fa-pencil-alt', 'Modifica'),
            loading: state.loading
        },
        {action: () => deleteSkill(skill.id, callback), label: label('fas fa-trash', 'Elimina'), loading: state.loading}
    ]

    const body = () => {
        return (<>
                <p><ShortText text={skill.description1}/></p>
                <p><b>Info Addizionali:</b> <ShortText text={skill.description2}/></p>
            </>
        )
    }

    return (
        <>
            <Card title={`${skill.name} - ID ${skill.id}`}
                  body={body()}
                  buttons={buttons}
            />
            {update ? <UpdateSkillModal skill={skill} active={update} setActive={setUpdate}
                                        reloadCallback={callback}/> : <></>}
        </>
    )
}

export default Skill