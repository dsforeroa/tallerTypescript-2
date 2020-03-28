import { dataCourses } from "./dataCourses.js";
import { dataStudent } from "./dataStudents.js";
import { Course } from "./course.js";
import { Student } from "./student.js";

const coursesTbody: HTMLElement | null = document.getElementById("courses")!;
const mainName: HTMLElement | null = document.getElementById("main-name")!;
const mainPic: HTMLElement | null = document.getElementById("pic")!;
const studentTbody: HTMLElement | null = document.getElementById("student-body")!;
const btnfilterByName: HTMLElement | null = document.getElementById("button-filterByName")!;
const btnfilterByCredit: HTMLElement | null = document.getElementById("button-filterByCredit")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const inputCreditMin: HTMLInputElement = <HTMLInputElement>document.getElementById("credit-min")!;
const inputCreditMax: HTMLInputElement = <HTMLInputElement>document.getElementById("credit-max")!;
const totalCreditElm: HTMLElement | null = document.getElementById("total-credits")!;


const filterByName = (() => {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    cleanTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
});


const filterByCredit = (() => {


    let min = inputCreditMin.value;
    let max = inputCreditMax.value;
    min = (min == null) ? '' : min;
    max = (max == null) ? '' : max;
    cleanTable();
    let coursesFiltered: Course[] = searchCourseByCredit(dataCourses, min, max);
    renderCoursesInTable(coursesFiltered);
});


const searchCourseByCredit = ((courses: Course[], min: string, max: string) => {

    let firstFilter: Course[] = (min === '')
        ? courses
        : courses.filter(item => item.credits >= parseInt(min));

    let secondFilter: Course[] = (max === '')
        ? firstFilter
        : firstFilter.filter(item => item.credits <= parseInt(max));

    return secondFilter;


});

const renderCoursesInTable = ((courses: Course[]) => {
    if (coursesTbody) {
        courses.forEach((course) => {
            let trElement = document.createElement("tr");
            trElement.innerHTML = `<td>${course.name}</td>
                                    <td>${course.professor}</td>
                                    <td>${course.credits}</td>`;
            coursesTbody.appendChild(trElement);

        })
    };
});



const getTotalCredits = (courses: Course[]): number => {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}



const searchCourseByName = ((nameKey: string, courses: Course[]) => {
    return nameKey === '' ? dataCourses : courses.filter(c =>
        c.name.match(nameKey));
});



const cleanTable = (() => {
    let child = coursesTbody.lastChild;
    while (child) {
        coursesTbody.removeChild(child);
        child = coursesTbody.lastChild;
    }
});

const loadDataStudent = ((student: Student) => {

    (mainName)? mainName.innerText= student.completeName:null;
    (mainPic)?mainPic.setAttribute("src",student.avatar):null;
    
    if (studentTbody) {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>Código</td>
                                    <td>${student.completeName}</td>`;
        studentTbody.appendChild(trElement);

        trElement = document.createElement("tr");
        trElement.innerHTML = `<td>Cédula</td>
                                <td>${student.cardId}</td>`;
        studentTbody.appendChild(trElement);

        trElement = document.createElement("tr");
        trElement.innerHTML = `<td>Edad</td>
                                <td>${student.age}</td>`;
        studentTbody.appendChild(trElement);

        trElement = document.createElement("tr");
        trElement.innerHTML = `<td>Dirección</td>
                                <td>${student.address}</td>`;
        studentTbody.appendChild(trElement);

        trElement = document.createElement("tr");
        trElement.innerHTML = `<td>Teléfono</td>
                                <td>${student.phone}</td>`;
        studentTbody.appendChild(trElement);
    }
});


btnfilterByName.onclick = () => filterByName();
btnfilterByCredit.onclick = () => filterByCredit();
filterByName();
loadDataStudent(dataStudent);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

