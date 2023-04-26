import './SelectButtonStyle.css'

type SelectButtonProps = {
    leftButtonAction: () => void,
    rightButtonAction: () => void,

    value: string | undefined,
}

function SelectButton(prop: SelectButtonProps) {
    const style: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between"
    }
    const buttonStyle: React.CSSProperties = {
    }
    return (
        <div style={style}>
            <button className="SelectButtonItem" onClick={prop.leftButtonAction}>&lt;</button>
            <span>{prop.value}</span>
            <button className="SelectButtonItem" onClick={prop.rightButtonAction}>&gt;</button>
        </div>
    )
}

export default SelectButton;