//approach outlined in https://stackoverflow.com/a/74026755
async function svg2png(svg, width, height) {
    var dataHeader = 'data:image/svg+xml;charset=utf-8;base64'
    var svgEncoded = `${dataHeader},${btoa(svg)}`
    const img = document.createElement('img')
    img.src = svgEncoded;
    await img.decode();
    const canvas = document.createElement('canvas')
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(img, 0, 0, width, height)
    img.src = await canvas.toDataURL(`image/png`, 1.0);
    return img;
}