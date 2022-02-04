import Card from "../Card";
import {useSkills} from "../../services/SkillService";

function Skill({skill, callback}) {

    const {state, deleteSkill} = useSkills()

    const buttons = [
        {action: () => deleteSkill(skill.id, callback), label: "Elimina", loading: state.loading}
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
            <Card title={skill.name}
                  body={body()}
                  buttons={buttons}
            />
        </>
    )
}

export default Skill