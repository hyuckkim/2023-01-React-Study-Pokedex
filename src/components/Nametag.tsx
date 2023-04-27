type NameTagProps = {
    children: string,
    color: string
}

function Nametag(prop: NameTagProps) {
    return (
        <p style={{
            padding: 10,
            borderStyle: "solid",
            borderRadius: 10,
            margin: 10,
            borderColor: prop.color,
            height: 20,
        }}>{prop.children}</p>
    )
}

export default Nametag;