function xss() {
    document.getElementById('button1').disabled = false;
    const exampleParagraph1 = document.getElementById('exampleParagraph1');
    const club = document.getElementById('club').value;
    exampleParagraph1.innerHTML =  'Are you sure you want to add the following jersey of ' + club
}