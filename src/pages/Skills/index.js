import {useEffect, useState} from "react";
import {defaultPagination} from "../../utils";
import {CreateSkillModal, Skill, Loader} from "../../components";
import {useSkills} from "../../services/SkillService";
import Pagination from "../../components/Pagination";

function Skills() {
    const [initiated, setInitiated] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const {state: skillState, getSkills} = useSkills()

    const updatePagination = p => {
        let newPagination
        if (skillState?.pagination)
            newPagination = {...skillState?.pagination, ...p}
        else newPagination = {...p}
        getSkills(newPagination)
    }
    useEffect(() => {
            if (!initiated) {
                getSkills(defaultPagination())
                setInitiated(true)
            }
        }
    )

    const reloadCallback = () => {
        getSkills()
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
                        <div key={skill.id} className="column is-12-mobile is-6-tablet is-4-desktop">
                            <Skill skill={skill} callback={reloadCallback}/>
                        </div>))}
                </div>
                <div className="is-flex is-align-items-center is-justify-content-center">
                    <Pagination data={skillState.skills} doSearch={updatePagination} />
                </div>
            </section>
            <CreateSkillModal active={showCreate} setActive={setShowCreate} reloadCallback={reloadCallback}/>
        </>
    );
}

export default Skills;
