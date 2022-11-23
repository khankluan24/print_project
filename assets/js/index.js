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
const address = document.getElementById("address");
const imgPreview = document.getElementById("imgPreview");

const loadFile = function (event) {
    imgPreview.src = URL.createObjectURL(event.target.files[0]);
    imgPreview.onload = function () {
        URL.revokeObjectURL(output.src); // free memory
    };
};

const eligibleGraduateTime = 22;
const eligibleAge = 18;

function handleAddPage() {
    const url = "http://127.0.0.1:5500/index.html";
    document.location.href = url;
}

function handleSubmit() {
    if (!validator()) return;
    const url = `http://127.0.0.1:5500/print.html?userName=${userName.value}&position=${position.value}&dateOfBirth=${dateOfBirth.value}&gender=${gender.value}&phone=${phone.value}&email=${email.value}&website=${website.value}&objective=${objective.value}&educationTime=${educationTime.value}&educationInfo=${educationInfo.value}&address=${address.value}&imageUser=${imageUser.value}`;
    document.location.href = url;
    var fReader = new FileReader();
    fReader.readAsDataURL(imageUser.files[0]);
    fReader.onloadend = function (event) {
        localStorage.setItem("imageUser", event.target.result);
    };
}
window.onload = function () {
    const url = document.location.href;
    console.log(window.location.pathname);

    if (
        window.location.pathname === "/" ||
        window.location.pathname === "/index.html"
    )
        return;
    const params = url.split("?")[1].split("&");

    let data = {},
        tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split("=");
        data[tmp[0]] = tmp[1];
    }
    userName.innerHTML = data.userName.replaceAll("%20", " ");
    position.innerHTML = data.position.replaceAll("%20", " ");
    dateOfBirth.innerHTML = data.dateOfBirth.split("%")[0];
    gender.innerHTML = data.gender.replaceAll("%20", " ");
    phone.innerHTML = data.phone.replaceAll("%20", " ");
    email.innerHTML = data.email.replaceAll("%20", " ");
    website.innerHTML = data.website.replaceAll("%20", " ");
    objective.innerHTML = data.objective.replaceAll("%20", " ");
    educationTime.innerHTML = data.educationTime.replaceAll("%20", " ");
    educationInfo.innerHTML = data.educationInfo.replaceAll("%20", " ");
    address.innerHTML = data.address.replaceAll("%20", " ");
    if (localStorage.getItem("imageUser")) {
        imageUser.src = localStorage.getItem("imageUser");
    } else {
        imageUser.src =
            "https://cdn.popsww.com/blog-kids/sites/3/2022/04/songoku-nho.jpg";
    }
};

const success = (element, message, identify) => {
    element.classList.add("success");
    element.classList.remove("error");
    const messageItem = document.querySelector(
        `[title=${identify.toString()}]`
    );
    messageItem.classList.remove("invalid");
    messageItem.innerText = message;
};

const error = (element, message, identify) => {
    element.classList.add("error");
    element.classList.remove("success");
    const messageItem = document.querySelector(
        `[title=${identify.toString()}]`
    );
    messageItem.classList.add("invalid");
    messageItem.innerText = message;
};

const checkPhone = (phone) => {
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/;
    return regex.test(phone);
};
const checkMail = (mail) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(mail);
};
const checkValid = () => {
    const userInfoArray = [
        userName,
        position,
        dateOfBirth,
        gender,
        educationInfo,
        educationTime,
        address,
        email,
        phone,
    ];
    let check = true;
    for (let i = 0; i < userInfoArray.length; i++) {
        const infoNameAttribute = userInfoArray[i].getAttribute("name");
        if (userInfoArray[i].value.trim().length <= 0) {
            error(
                userInfoArray[i],
                "Vui lòng điền vào trường này",
                infoNameAttribute
            );
            check = false;
        } else {
            success(userInfoArray[i], "", infoNameAttribute);
        }
    }
    return check;
};
const validator = () => {
    console.log(checkValid());

    if (checkValid()) {
        const dateOfBirthValue = dateOfBirth.value;
        const phoneValue = phone.value.trim();
        const mailValue = email.value.trim();
        const imageUserLink = imageUser.files[0];

        // Check phone
        if (!checkPhone(phoneValue)) {
            error(phone, "Định dạng phone không đúng", "phone");
            return false;
        } else if (phoneValue.length !== 10) {
            error(phone, "Độ dài phone yêu cầu là 10", "phone");
            return false;
        } else {
            success(phone, "", "phone");
        }

        // Check image
        if (!imageUserLink) {
            error(imageUser, "Vui lòng upload ảnh", "imageUser");
            return false;
        } else {
            success(imageUser, "", "imageUser");
        }

        //Check email
        if (!checkMail(mailValue)) {
            error(email, "Định dạng email không đúng", "email");
            return false;
        } else {
            success(email, "", "email");
        }

        // Check date
        if (new Date(dateOfBirthValue) > new Date()) {
            error(
                dateOfBirth,
                "Ngày sinh không được lớn hơn ngày hôm nay",
                "dateOfBirth"
            );
            return false;
        }

        //Check date gra
        if (new Date(educationTime) > new Date()) {
            error(dateOfBirth, "Ngày tốt nghiệp không hợp lý", "educationTime");
            return false;
        }

        // check gender
        if (!gender.value) {
            error(gender, "Chọn giới tính hợp lệ", "gender");
            return false;
        } else {
            success(gender, "", "gender");
        }
        return true;
    }
    return false;
};
function handlePrint() {
    window.print();
}
