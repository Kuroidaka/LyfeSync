import { useEffect, useState } from "react"
import styled from "styled-components"
import Input from "../../../Component/Input"
import { Img } from "../../../Assets/svg";

const SubTask = (p) => {
    const { color, title, done, updateSubCheck, id, deleteSubTask } = p

    const [checked, setChecked] = useState(done)
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState(title)

    useEffect(() => {
        setValue(title)
    }, [title])

    const inputStyle = {
        width:"100%",
        height:"35px",
        backgroundColor:"transparent",
        border: "none",
        fontSize: "1.2rem"
    }

    const handleCheck = (e) => {
        setChecked(!checked)

        const id = e.currentTarget.id
        updateSubCheck(id, !checked)
    }

    const openEdit = () => {
        setEdit(true)
    }
    
    const closeEdit = () => {
        setEdit(false)
    }


    const handleInput = (e) => {
        const value = e.target.value
        setValue(value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            closeEdit()
        }
    }

    const handleDel = (e) => {
        const id = e.currentTarget.getAttribute("name")
        deleteSubTask(id)
    }
    
    return (
    <SubTaskContainer className={`item ${color ?"text-white" : ""}`}>
        <div className="title-wrapper">
        <span id={id} onClick={handleCheck} className={`${checked ? "blur" : ""}`}>{checked ? <Img.checkboxChecked /> : <Img.checkbox/>}</span>
            <div className={`title ${checked ? "line-through" : ""}`}>
                {edit
                ? <Input
                    value={value}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    name="title"
                    className={`${color ? "text-white" : ""}`}
                    inputStyle={inputStyle}
                    plhdercolor={`${color ? "var(--white-text)": "var(--black-text)"}`}
                    focusborder="false"
                />
                : value
                }
            
            </div>
        </div>

        <div className="option">
            <span onClick={openEdit}><Img.edit/></span>
            <span name={id} onClick={handleDel}><Img.deleteIcon/></span>
        </div>
    </SubTaskContainer>
    )
}

export default SubTask

const SubTaskContainer = styled.div `
    display: flex;
    justify-content: space-between;
    .title-wrapper {
        display: flex;
        align-items: center;

        span {
            line-height: 1;

            svg {
                width: 16px;
                cursor: pointer;
            }
        }

        .title {
            margin-left: .6rem;
            font-size: 1.3rem;
        }
    }

    .option {
        display: flex;
        svg {
            cursor: pointer;
            width: 15px;
            margin-left: 10px;
        }
    }
`
