var fileData = new Set();
async function handleFileRead(event) {  
    let data = event.target.result;
    if (!fileData.has(data)) {
        let idx = fileData.size;
        fileData.add(data);
        let $cont = $("<div>", { class: "img-preview-container", "data-idx": idx });
        let $img = $("<img>", { class: "img-preview", src: data });
        let $del = $("<img>", { class: "img-preview-delete", src: "./img/xmark.svg" });
        $img.appendTo($cont);
        $del.appendTo($cont);
        $cont.appendTo($("#img-preview-grid"));
    }
}
function addFiles() {  
    let files = $("#img-upload-underlying").prop("files");
    for (var file of files) {
        const filereader = new FileReader();
        filereader.onload = handleFileRead;
        filereader.readAsDataURL(file);
    }
    $("#img-upload-underlying").prop("value", null);
}  
function deleteImage() {
    let idx = parseInt(this.parentNode.getAttribute("data-idx"));
    let cont = $(`.img-preview-container[data-idx='${idx}']`);
    let src = cont.children(".img-preview").eq(0).attr("src");
    fileData.delete(src);
    cont.remove();
    for (let i = idx + 1; i <= fileData.size; i++) {	
        $(`.img-preview-container[data-idx='${i}']`).attr("data-idx", i - 1);
    }
}
function generateDisplaySVG() {
    $("#output-img-container svg, #output-img-container img").remove();
    $(generateSVG(fileData)[0]).appendTo("#output-img-container");
}
async function generateDisplayPNG() {
    $("#output-img-container svg, #output-img-container img").remove();
    var [svg, width, height] = generateSVG(fileData);
    $(await svg2png(svg, width, height)).appendTo("#output-img-container");
}
function handleImageClick () {
    //unimplemented
}
$(document).ready(function(){
    $("#img-upload-underlying").change(addFiles);
    $("#img-preview-grid").on("click", ".img-preview-delete", deleteImage);
    $("#img-preview-grid").on("click", ".img-preview", handleImageClick);
    $("#generate-svg-button").click(generateDisplaySVG);
    $("#generate-png-button").click(generateDisplayPNG);
})