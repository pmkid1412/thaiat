function function_1(function_2, function_3) {
    if (!function_2) {
        return;
    }
    ;
    var function_1 = new Date;
    if (function_1.getFullYear() * 1e4 + (1 + function_1.getMonth()) * 100 + function_1.getDate() < parseInt(function_2)) {
        return;
    }
    ;
    throw function_3 || "error";
}
function function_2(function_3, function_7, function_6) {
    if (!function_3) {
        return;
    }
    ;
    var function_4 = this.location.href.split("://")[1].split("/")[0].split(":")[0];
    var function_1 = function_3.split(",");
    for (var function_5 = 0; function_5 < function_1.length; function_5++) {
        var function_2 = function_1[function_5];
        if (function_2 == function_4) {
            return;
        }
        ;
        if (!function_7) {
            continue;
        }
        ;
        function_2 = function_4.split("." + function_2);
        if (function_2.length == 2 && !function_2[1]) {
            return;
        }
    }
    ;
    throw function_6 || "error";
}
function function_3() {
    localStorage.removeItem("token");
    thanghan_en = false;
    function_10("_thanghan");
    location.reload();
}
function function_4() {
    const function_3 = document.getElementById("email1").value;
    const function_2 = document.getElementById("password1").value;
    var function_1 = CryptoJS.MD5(function_2).toString();
    fetch("" + _0xC594 + "/login", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({username: function_3, password: function_1})}).then(function_1 => {
        return function_1.json();
    }).then(function_1 => {
        if (function_1.success) {
            localStorage.setItem("token", function_1.token);
            function_5();
        } else {
            alert(function_1.message);
        }
    }).catch(function_1 => {
        console.error("Lỗi khi đăng nhập:", function_1);
    });
}
function function_5() {
    const function_1 = document.querySelector("#loginModal .close");
    function_1.click();
    location.reload();
}
function function_6() {
    const function_1 = document.getElementById("dangnhap");
    function_1.setAttribute("data-toggle", "dropdown");
    function_1.removeAttribute("data-target");
    function_1.classList.remove("nav-item", "nav-link", "notifications");
    function_1.classList.add("nav-link", "dropdown-toggle");
    let function_5 = '<ul class="dropdown-menu">';
    function_5 += '<li href="#" class="dropdown-item"><i class="fa fa-user-o"></i> Trang cá nhân</li>';
    function_5 += '<div class="dropdown-divider"></div>';
    function_5 += '<li href="#" class="dropdown-item" id="logoutItem"><i class="material-icons">&#xE8AC;</i> Đăng xuất</li>';
    function_5 += "</ul >";
    let function_2 = document.getElementById("menudangnhap");
    function_2.innerHTML = function_5;
    thanghan_en = true;
    function_9("_thanghan");
    const function_4 = document.getElementById("logoutItem");
    function_4.addEventListener("click", function () {
        function_3();
    });
}
function function_7() {
    alert("Sorry! Hiện chưa kích hoạt chức năng này!");
}
function function_8() {
    var function_1 = document.getElementById("signupLink");
    function_1.addEventListener("click", function (function_2) {
        function_2.preventDefault();
        var function_3 = document.getElementById("signupModal");
        if (function_3) {
            const function_1 = document.querySelector("#loginModal .close");
            function_1.click();
        }
    });
}
function function_9(function_1) {
    var function_2 = document.getElementById(function_1);
    function_2.removeAttribute("readonly");
}
function function_10(function_1) {
    var function_2 = document.getElementById(function_1);
    function_2.setAttribute("readonly", "readonly");
}
logout = function_3;
login = function_4;
closeModal = function_5;
refreshNavbar = function_6;
signup = function_7;
enableInput = function_9;
disableInput = function_10;
function_1("20291231", "Bạn hãy liên hệ với chuongnv.com để được gia hạn bản quyền!");
function_2("tuviphucso.com", 1, "Bạn hãy liên hệ với chuongnv.com để được cập nhật bản quyền!");
let _0xC594 = "https://tuvidientoan.org";
token = localStorage.getItem("token");
if (!token) {} else {
    fetch("" + _0xC594 + "/dashboard", {headers: {Authorization: token}}).then(function_1 => {
        return function_1.json();
    }).then(function_1 => {
        if (function_1.success) {
            document.getElementById("dangnhap").textContent = function_1.message;
            function_6();
        } else {
            alert("Xác thực thất bại. Vui lòng đăng nhập lại.");
            function_4();
        }
    }).catch(function_1 => {
        console.error("Lỗi khi xác thực token:", function_1);
    });
}
;
document.addEventListener("DOMContentLoaded", function_8);
