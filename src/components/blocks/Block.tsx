import React from "react";

type BlockProps = {
    title: string,
    children: JSX.Element
}
function Block(prop: BlockProps) {
    return (
        <div>
            <h2>{prop.title}</h2>
            {prop.children}
        </div>
    )
}

export default Block;