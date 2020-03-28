import { dataCourses } from "./dataCourses.js";
var coursesTbody = document.getElementById("courses");
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var ejecutarFiltro = (function () {
    var text = inputSearchBox.value;
    console.log('text :', text);
    text = (text == null) ? '' : text;
    cleanTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
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
btnfilterByName.onclick = function () { return ejecutarFiltro(); };
ejecutarFiltro();
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
