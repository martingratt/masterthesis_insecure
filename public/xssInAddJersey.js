function checkInput() {
    document.getElementById('button1').disabled = false;
    const checkInputParagraph = document.getElementById('checkInputParagraph');
    const club = document.getElementById('club').value;
    checkInputParagraph.innerHTML =  'Are you sure you want to add the following jersey of ' + club
}