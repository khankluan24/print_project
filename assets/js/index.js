// Import module mỗi chức năng
function handleAddPage() {
    const url = 'http://127.0.0.1:5500/index.html'
    document.location.href = url;
}
function handleOutputPrint() {
    window.print();
}
function handlePrint() {
    const userName = document.getElementById('userName').value;
    const position = document.getElementById('position').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('website').value;
    const objective = document.getElementById('objective').value;
    const educationTime = document.getElementById('educationTime').value;
    const educationInfo = document.getElementById('educationInfo').value;
    
    const url = `http://127.0.0.1:5500/print.html?userName=${userName}&position=${position}&dateOfBirth=${dateOfBirth}
    &gender=${gender}&phone=${phone}&email=${email}&website=${website}&objective=${objective}&educationTime=${educationTime}&educationInfo=${educationInfo}`

    document.location.href = url;
}
window.onload = function () {
    const url = document.location.href;
    const  params = url.split('?')[1].split('&');
    let  data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    document.getElementById('userName').innerHTML = data.userName.replaceAll('%20', ' ');
    document.getElementById('position').innerHTML = data.position;
    document.getElementById('dateOfBirth').innerHTML = data.dateOfBirth.split('%')[0];
    document.getElementById('gender').innerHTML = data.gender;
    document.getElementById('phone').innerHTML = data.phone;
    document.getElementById('email').innerHTML = data.email;
    document.getElementById('website').innerHTML = data.website;
    document.getElementById('objective').innerHTML = data.objective;
    document.getElementById('educationTime').innerHTML = data.educationTime;
    document.getElementById('educationInfo').innerHTML = data.educationInfo;
    const imgTag = document.getElementById('userInfo__img-img')
    console.log(imgTag)
    if(imgTag)
        {        
            imgTag.src = URL.createObjectURL(localStorage.getItem('myfile'));
            console.log(URL.createObjectURL(localStorage.getItem('myfile')));
            imgTag.onload = function() {
                URL.revokeObjectURL(imgTag.src)
            }
        }
}

function loadFile(event) {
    let output = document.getElementById('output');
    
    localStorage.setItem('myfile', event.target.files[0])
    output.src = URL.createObjectURL(event.target.files[0]);
    console.log(output);
    output.onload = function() {
      URL.revokeObjectURL(output.src)
    }
  };