import Card from "../Card";
import {useSkills} from "../../services/SkillService";

function Skill({skill, callback}) {

    const {state, deleteSkill} = useSkills()

    const buttons = [
        {action: () => deleteSkill(skill.id, callback), label: "Elimina", loading: state.loading}
    ]

    return (
        <>
            <Card title={skill.name}
                  body={<p>{skill.description}</p>}
                  buttons={buttons}
            />
        </>
    )
}

export default Skill