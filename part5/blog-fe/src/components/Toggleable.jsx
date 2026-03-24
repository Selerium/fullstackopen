import { useState, useImperativeHandle } from "react";

const Toggleable = (props) => {
    const [shown, setShown] = useState(false);

    const toggleVisibility = () => {
        setShown(!shown);
    }

    useImperativeHandle(props.ref, () => {
        return { toggleVisibility }
    })

    return (
        <>
            {!shown && <button onClick={toggleVisibility}>{props.showText}</button>}
            {shown && props.children}
            {shown && <button onClick={toggleVisibility}>{props.hideText}</button>}
        </>
    )
}

export default Toggleable;