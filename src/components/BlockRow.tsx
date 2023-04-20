type BlockRowProps = { 
    children: JSX.Element[] | JSX.Element
}

function BlockRow (prop: BlockRowProps) {
    const style: React.CSSProperties = {
        display: "flex"
    }
    return (
    <div style={style}>
        {prop.children}
    </div>)
}

export default BlockRow;