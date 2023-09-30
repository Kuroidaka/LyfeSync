import { motion } from "framer-motion"
import { useState } from "react"
import styled from "styled-components"

import { plannerData } from "./Planner.data";

const TaskSection = (p) => {

    const { data, children, openModalData } = p
    const dateZone = data.DateZone
 
    const hleSelctDateZ = (e) => {
        setState(e.target.getAttribute("name"))
    }

    const [state, setState] = useState(data.dateZone[0].name)

    const handleClickAdd = (e) => {
        const name = e.target.getAttribute("name")
        openModalData(name)
        // localStorage.setItem("tab", name)
    }

    return (
    <Task 
        drag
        dragDirectionLock
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragElastic={0.5}    >
        <h2 className="select-none title">{data.name}<span className="icon-wrap" onClick={handleClickAdd} name={data.name}> &nbsp;+ </span></h2>
        <DateZone>
            {dateZone && dateZone.map(date => {
                return (
                <span 
                    key={date.name}
                    name={date.name}
                    className={`select-none ${state === date.name ? "active" : ""}`}
                    onClick={hleSelctDateZ}>{date.value}</span>
                )
            })}
        </DateZone> 
        {children}
    </Task>
    )
}

export default TaskSection;


const Task = styled(motion.section)`
    width: 100%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-top: 16px;
`



const DateZone = styled.div`
    display: flex;
    justify-content: flex-start;

    span {
        margin-right: 1.5rem;
        cursor: pointer;
        color: #626262;
        font-weight: 500;
        font-family: fantasy;
        font-weight: 600;
        transition: all 0.3s ease-in-out;

        &:hover {
            color: #FDBD3E;
        }

        &.active {
            color: #000000;
            font-size: larger;
            cursor: default;
        }
    }
`
