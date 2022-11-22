import {
  userName,
  position,
  dateOfBirth,
  gender,
  phone,
  email,
  website,
  objective,
  educationTime,
  educationInfo,
} from "./index.js";
const phone1 = document.getElementById("phone");
// phone1.classList.add("error");
// const messageItem = document.querySelector(`.message-text.phone`)
// console.log(messageItem);

const success = (element, message, identify) => {
  element.classList.add("success");
  element.classList.remove("error");
  const messageItem = document.querySelector(`.message-text.${identify}`);
  messageItem.innerText = message;
};

const error = (element, message, identify) => {
  element.classList.add("error");
  element.classList.remove("success");
  const messageItem = document.querySelector(`.message-text.${identify}`)
  messageItem.innerText = message;
};

const checkPhone = phone => {
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/;
    return regex.test(phone)
} 

export const validator = () => {
  const dataOfBirthValue = dateOfBirth.value.trim();
  const phoneValue = phone1.value.trim();
  const educationTimeValue = educationTime.value.trim();

 if(!checkPhone(phoneValue)) {
    error(phone1,'Định dạng phone không đúng','phone')
 }
 else if (phoneValue.length !== 10) {
    error(phone1,'Độ dài phone yêu cầu là 10','phone')
 }
 else {success(phone1,'','phone')}
};

