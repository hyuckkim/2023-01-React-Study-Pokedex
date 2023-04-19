import React from "react";

type BlockProps = {
    title: string,
    children: JSX.Element | JSX.Element[]
}
function Block(prop: BlockProps) {
    const style: React.CSSProperties = {
        backgroundColor: "#ffffff",
        borderRadius: 30,
        padding: 12,
        margin: 30,
    }
    const h2style: React.CSSProperties = {
        margin: 0,
    }
    return (
        <div style={style}>
            <h2 style={h2style}>{prop.title}</h2>
            {prop.children}
        </div>
    )
}

export default Block;