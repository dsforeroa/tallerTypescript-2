import { dataCourses } from "./dataCourses.js";
import { dataStudent } from "./dataStudents.js";
import { Course } from "./course.js";
import { Student } from "./student.js";


const coursesTbody: HTMLElement | null = document.getElementById("courses")!;
const btnfilterByName: HTMLElement | null = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const totalCreditElm: HTMLElement | null = document.getElementById("total-credits")!;

const ejecutarFiltro = (() => {

    let text = inputSearchBox.value;
    console.log('text :', text);
    text = (text == null) ? '' : text;
    cleanTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
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


btnfilterByName.onclick = () => ejecutarFiltro();
ejecutarFiltro();
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

