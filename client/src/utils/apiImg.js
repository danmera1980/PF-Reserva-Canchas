import $ from "jquery";

export function fileChange() {
  var file = document.getElementById("input_img");
  var form = new FormData();
  form.append("image", file.files[0]);

  var settings = {
    url: "https://api.imgbb.com/1/upload?key=64fe53bca6f3b1fbb64af506992ef957",
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  $.ajax(settings).done(function (response) {
    var jx = JSON.parse(response);
    console.log(jx.data.url);
  });
}
