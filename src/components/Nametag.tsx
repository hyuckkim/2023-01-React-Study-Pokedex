type NameTagProps = {
    children: string
}

function Nametag(prop: NameTagProps) {
    return (
        <div>{prop.children}</div>
    )
}

export default Nametag;