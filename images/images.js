const imagenes = {
  logo_vect: '',
};

for (i in imagenes) {
  var img = document.querySelectorAll("img[src='" + i + "']");

  if (img != null) {
    for (j of img) {
      j.setAttribute('src', imagenes[i]);
    }
  }
}
