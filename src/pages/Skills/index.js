import {useEffect, useState} from "react";
import {defaultPagination} from "../../utils";
import {CreateSkillModal, Skill, Loader} from "../../components";
import {useSkills} from "../../services/SkillService";

function Skills() {
    const [initiated, setInitiated] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [pagination, setPagination] = useState(defaultPagination())
    const {state: skillState, getSkills} = useSkills()

    const updatePagination = p => {
        const newPagination = {...pagination, p}
        setPagination(newPagination)
        getSkills(newPagination)
    }

    useEffect(() => {
            if (!initiated) {
                getSkills(pagination)
                setInitiated(true)
            }
        }
    )

    const reloadCallback = () => {
        getSkills(pagination)
    }

    return (
        <>
            <section className="section">
                <div className="is-flex is-align-items-center is-justify-content-space-between">
                    <h1 className="title">Abilità</h1>

                    <div className="">
                        <button onClick={() => setShowCreate(true)} className="button is-primary is-small"><i
                            className="fas fa-plus"/></button>
                    </div>
                </div>
                <div className="columns is-multiline">
                    {skillState.loading ? <div className="column is-12">
                        <Loader/>
                    </div> : <></>}
                    {skillState.loading ? <></> : skillState.skills?.content?.map(skill => (
                        <div key={skill.id} className="column is-12-mobile is-6-tablet is-3">
                            <Skill skill={skill} callback={reloadCallback}/>
                        </div>))}
                </div>
            </section>
            <CreateSkillModal active={showCreate} setActive={setShowCreate} reloadCallback={reloadCallback}/>
        </>
    );
}

export default Skills;
