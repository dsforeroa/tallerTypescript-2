import { Course } from './course.js';

export class Student {

    completeName: string;
    avatar: string;
    code: number;
    cardId: number;
    age: number;
    address: string;
    phone: string;
    currentCourses: Course[];

    constructor(completeName: string, avatar: string, code: number, cardId: number,age:number,addres:string,phone:string,currentCourses:Course[]) {
        this.completeName = completeName;
        this.code = code;
        this.cardId = cardId;
        this.avatar =avatar;
        this.age = age;
        this.address = addres;
        this.phone = phone;
        this.currentCourses = currentCourses;
    }

}