const userName = document.getElementById("userName");
const position = document.getElementById("position");
const dateOfBirth = document.getElementById("dateOfBirth");
const gender = document.getElementById("gender");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const website = document.getElementById("website");
const objective = document.getElementById("objective");
const educationTime = document.getElementById("educationTime");
const educationInfo = document.getElementById("educationInfo");
const imageUser = document.getElementById("imageUser");
const eligibleGraduateTime = 22
const eligibleAge = 18

function handleAddPage() {
  const url = "http://127.0.0.1:5500/index.html";
  document.location.href = url;
}
function handlePrint() {
  if (!validator()) return;
  const url = `http://127.0.0.1:5500/print.html?userName=${userName.value}&position=${position.value}&dateOfBirth=${dateOfBirth.value}
    &gender=${gender.value}&phone=${phone.value}&email=${email.value}&website=${website.value}&objective=${objective.value}&educationTime=${educationTime.value}&educationInfo=${educationInfo.value}`;

  document.location.href = url;
}
window.onload = function () {
  const url = document.location.href;
  if (window.location.pathname.includes("/")) return;
  const params = url.split("?")[1].split("&");

  let data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  userName.innerHTML = data.userName;
  position.innerHTML = data.position;
  dateOfBirth.innerHTML = data.dateOfBirth.split("%")[0];
  gender.innerHTML = data.gender;
  phone.innerHTML = data.phone;
  email.innerHTML = data.email;
  website.innerHTML = data.website;
  objective.innerHTML = data.objective;
  educationTime.innerHTML = data.educationTime;
  educationInfo.innerHTML = data.educationInfo;
};

const success = (element, message, identify) => {
  element.classList.add("success");
  element.classList.remove("error");
  const messageItem = document.querySelector(`[title=${identify.toString()}]`);
  messageItem.classList.remove("invalid");
  messageItem.innerText = message;
};

const error = (element, message, identify) => {
  element.classList.add("error");
  element.classList.remove("success");
  const messageItem = document.querySelector(`[title=${identify.toString()}]`);
  messageItem.classList.add("invalid")
  messageItem.innerText = message;
};

const checkPhone = (phone) => {
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/;
  return regex.test(phone);
};

const validator = () => {
  const dateOfBirthValue = dateOfBirth.value;
  const phoneValue = phone.value.trim();
  const imageUserLink = imageUser.files[0];

  const userInfoArray = [
    userName,
    position,
    email,
    phone,
    dateOfBirth,
    gender,
    educationInfo,
    educationTime,
  ];
  userInfoArray.forEach((info) => {
    const infoNameAttribute = info.getAttribute("name");
    if (!info.value.trim()) {
      error(info, "Vui lòng điền vào trường này", infoNameAttribute);
      return false
    } else {
      success(info, "", infoNameAttribute);
    }
  });

  // Check image
  if(!imageUserLink) {
    error(imageUser, 'Vui lòng upload ảnh','imageUser');
    return false
  }
  else if(imageUserLink.type !== ('image/png' && 'image/jpeg') ) {
    error(imageUser, 'Chỉ chấp nhận định dạng jpg,png','imageUser');
    return false
  }
  else {
    success(imageUser,'','imageUser')
  }

  // Check phone
  if (!checkPhone(phoneValue) ) {
    error(phone, "Định dạng phone không đúng", "phone");
    return false;
  } else if (phoneValue.length !== 10 ) {
    error(phone, "Độ dài phone yêu cầu là 10", "phone");
    return false;
  } else {
    success(phone, "", "phone");
  }

  // Check date
  if (new Date(dateOfBirthValue) > new Date()) {
    error(dateOfBirth, "Ngày sinh không được lớn hơn ngày hôm nay", "dateOfBirth");
    return false;
  }
  else if(new Date().getFullYear() - new Date(dateOfBirthValue).getFullYear() < eligibleAge) {
    error(dateOfBirth, "Chưa đủ tuổi xin việc", "dateOfBirth");
    return false;
  }
  else {
    success(dateOfBirth, "", "dateOfBirth")
  }

  if((new Date(educationTime.value).getFullYear() % 100) < eligibleGraduateTime) {
    error(educationTime, "Thời gian tốt nghiệp không chính xác", "educationTime");
    return false
  }
  else {
    success(educationTime, "", "educationTime")
  }

  // Check gender
  if(!gender.value) {
    error(gender, "Chọn giới tính hợp lệ", "gender");
    return false;
  }
  else {
    success(gender,'','gender')
  }

};
