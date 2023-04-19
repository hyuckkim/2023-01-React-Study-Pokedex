type SelectButtonProps = {
    leftButtonAction: () => void,
    rightButtonAction: () => void,

    value: string | undefined,
}

function SelectButton(prop: SelectButtonProps) {
    var style: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between"
    }
    return (
        <div style={style}>
            <button onClick={prop.leftButtonAction}>&lt;</button>
            <span>{prop.value}</span>
            <button onClick={prop.rightButtonAction}>&gt;</button>
        </div>
    )
}

export default SelectButton;