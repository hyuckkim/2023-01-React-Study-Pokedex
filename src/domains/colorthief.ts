import ColorThief, { RGBColor } from "colorthief";

function extractColor(img: HTMLImageElement) {
    const thief = new ColorThief();
    var palette = thief.getPalette(img)

    return {
        color1: buildRGBColor(addRGBColor(palette[0], [15, 0, 0])),
        color2: buildRGBColor(addRGBColor(palette[0], [-15, 0, 0])),
    }
}

function buildRGBColor(c: RGBColor) {
    return  "#" + ((1 << 24) + (c[0] << 16) + (c[1] << 8) + c[2]).toString(16).slice(1);
}
function addRGBColor(a: RGBColor, b: RGBColor): RGBColor {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

export type Colors = {
    color1: string,
    color2: string,
}
export default extractColor;