function generateSVG(images) {
    let width = 520;
    let height = 50 + Math.ceil(images.size / 4) * 140 - 40;
    var s = SVG().size(width, height);
    //background
    s.rect(width, height).fill('#a7c957');
    //text
    s.text("glyh challemge").move(140, 20).font("family", "Noto Sans")
        .font("size", 30);
    var iter = images.entries();
    for (idx = 0; idx < images.size; idx++) {
        let image = iter.next().value[0];
        let col = idx % 4;
        let row = ~~(idx / 4);
        s.image(image).size(100,100).move(140*col, 50 + 140*row);
    };
    //return the svg as a string representation (of its xml), plus the width and height
    //since they would be a pain to parse out and we need them for rasterisation
    return [s.svg(), width, height];
}