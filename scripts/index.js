import { dataCourses } from "./dataCourses.js";
import { dataStudent } from "./dataStudents.js";
var coursesTbody = document.getElementById("courses");
var mainName = document.getElementById("main-name");
var mainPic = document.getElementById("pic");
var studentTbody = document.getElementById("student-body");
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredit = document.getElementById("button-filterByCredit");
var inputSearchBox = document.getElementById("search-box");
var inputCreditMin = document.getElementById("credit-min");
var inputCreditMax = document.getElementById("credit-max");
var totalCreditElm = document.getElementById("total-credits");
var filterByName = (function () {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    cleanTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
});
var filterByCredit = (function () {
    var min = inputCreditMin.value;
    var max = inputCreditMax.value;
    min = (min == null) ? '' : min;
    max = (max == null) ? '' : max;
    cleanTable();
    var coursesFiltered = searchCourseByCredit(dataCourses, min, max);
    renderCoursesInTable(coursesFiltered);
});
var searchCourseByCredit = (function (courses, min, max) {
    var firstFilter = (min === '')
        ? courses
        : courses.filter(function (item) { return item.credits >= parseInt(min); });
    var secondFilter = (max === '')
        ? firstFilter
        : firstFilter.filter(function (item) { return item.credits <= parseInt(max); });
    return secondFilter;
});
var renderCoursesInTable = (function (courses) {
    if (coursesTbody) {
        courses.forEach(function (course) {
            var trElement = document.createElement("tr");
            trElement.innerHTML = "<td>" + course.name + "</td>\n                                    <td>" + course.professor + "</td>\n                                    <td>" + course.credits + "</td>";
            coursesTbody.appendChild(trElement);
        });
    }
    ;
});
var getTotalCredits = function (courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
};
var searchCourseByName = (function (nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
});
var cleanTable = (function () {
    var child = coursesTbody.lastChild;
    while (child) {
        coursesTbody.removeChild(child);
        child = coursesTbody.lastChild;
    }
});
var loadDataStudent = (function (student) {
    (mainName) ? mainName.innerText = student.completeName : null;
    (mainPic) ? mainPic.setAttribute("src", student.avatar) : null;
    if (studentTbody) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>C\u00F3digo</td>\n                                    <td>" + student.completeName + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>C\u00E9dula</td>\n                                <td>" + student.cardId + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Edad</td>\n                                <td>" + student.age + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Direcci\u00F3n</td>\n                                <td>" + student.address + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Tel\u00E9fono</td>\n                                <td>" + student.phone + "</td>";
        studentTbody.appendChild(trElement);
    }
});
btnfilterByName.onclick = function () { return filterByName(); };
btnfilterByCredit.onclick = function () { return filterByCredit(); };
filterByName();
loadDataStudent(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
