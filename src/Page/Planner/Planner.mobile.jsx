import styled from "styled-components";
import {  Fragment, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion"
import TaskSection from "./TaskSection";
import { plannerData } from "./Planner.data";
import Button from "../../Component/Button";
import { Img } from "../../Assets/svg";
import TaskCard from "./card/TaskCard";
import TaskContext from "../../Context/Task.context";
import Loading from "../../Component/Loadding";


const PlannerMobile = (p) => {
    const { selectTab, tab, openModalData } = p
    const { task, loading }  = useContext(TaskContext)
    // const selectTab = (e) => {
    //     const name = e.target.getAttribute("name")
    //     setTab(name)
    // }

    // useEffect(() => {
    //     const name = localStorage.getItem("tab")
    //     if(name) setTab(name)
    // }, []);

    return ( 
        <Container>
            <Header>
                <TabList>
                {plannerData && Object.keys(plannerData).map((plan) => {
                    return (
                        <motion.li
                            key={plan}
                            name={plan}
                            className={`col3 ${tab === plan ? "active" : ""}`}
                            onClick={selectTab}>
                        {plan}
                        {tab === plan ? (<Underline layoutId="underline" />) : null}
                        </motion.li>
                    )
                })}
                </TabList> 
            </Header>
            {loading 
                ? <Loading /> 
                : <TaskSectionMobile tab={tab} task={task} openModalData={openModalData}></TaskSectionMobile>
            }
        </Container>
     );
}

const TaskSectionMobile = (p) => {
    const { openModalData, tab, task } = p
    const tabStyle = {
        initial: () => {
            return {
                x: -50,
                opacity: 0
            }
        },
        appear: () => {
            return {
                x: 0,
                opacity: 1
            }
        },
        disappear: () => {
            return {
                x: 50,
                opacity: 0
            }
        }
    }

    const hdleClickBtn = (e) => {
        const name = e.target.getAttribute("name")
        openModalData(name)
        // openModal(name)
    }

    return (
    <AnimatePresence mode="wait">
        <motion.div key={tab ? tab : "task" } 
                    variants={tabStyle}
                    animate="appear"
                    initial="initial"
                    exit="disappear"
                    transition={{ duration: 0.2 }} 
                    >
            
        <TaskSection key={tab} className="col3" data={tab} openModalData={openModalData}>
        {task && task.length > 0
            ?<TaskCard /> 
            :<Fragment>
                <ImgMotivation>
                    <img src={plannerData[tab]?.empty?.img} alt="" />
                </ImgMotivation> 

                <TextMotivation>
                    <p>{plannerData[tab]?.empty?.text1}</p>
                    <p>{plannerData[tab]?.empty?.text2}</p>
                    <p>{plannerData[tab]?.empty?.text3}</p>
                </TextMotivation>
                
                <Button title={`Tạo ${tab}`}  
                        className="text-center"
                        style={{marginTop: "16px"}}
                        name={tab}
                        onClick={hdleClickBtn}/>
            </Fragment>
        }
           
            

        </TaskSection>     
                
        </motion.div>
    </AnimatePresence>
    )
}



export default PlannerMobile;

const Container = styled.div`
    width: 100%;
    height: 100%;
    
`

const Header = styled.div`
    width: 100%;
    height: 30px;
`

const TabList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    height: 100%;
    box-shadow: 0 0 25px 0 rgba(0,0,0,.04);

    li {
        text-align: center;
        height: 100%;
        cursor: pointer;
        font-size: 1.4rem;
        font-weight: 500;
        position: relative;
        transition: all 0.3s ease-in-out;
        &.active {
            user-select: none;

        }
    }
`

const ImgMotivation = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    img {
        max-width: 250px;
        width: 100%;
    }
`
const TextMotivation = styled.div`

    p:nth-child(1) {
        text-align: center;
        font-weight: 600;
    }
    p:nth-child(2) {
        text-align: center;
        margin-top: .5rem;
        font-size: 1.15rem;

    }
    p:nth-child(3) {
        text-align: center;
        margin-top: .5rem;
        font-style: italic;
        font-size: 1rem;
    }
`
const Underline = styled(motion.div) `
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--main-gradient);
    border-radius: 10px;
`

