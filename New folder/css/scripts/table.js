function addRow() {
    var root = document.getElementById('mytab').getElementsByTagName('tbody')[0];
    var rows = root.getElementsByTagName('tr');
    var clone = cloneEl(rows[rows.length - 1]);
    // cleanUpInputs(clone);
    root.appendChild(clone);
}
function cloneEl(el) {
    var clo = el.cloneNode(true);
    return clo;
}
function cleanUpInputs(obj) {
    for (var i = 0; n = obj.childNodes[i]; ++i) {
      if (n.childNodes && n.tagName != 'INPUT') {
        cleanUpInputs(n);
      } else if (n.tagName == 'INPUT' && n.type == 'text') {
        n.value = '';
      }
    }  
  }