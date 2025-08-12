function roundDate(date){
     return new Date (
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        0 , 0
     );
}

let nowDate = roundDate(new Date());
let setDate = roundDate(new Date('2025-07-26T21:46:00+05:30'))
let newDate = roundDate(new Date('2025-07-26T21:46:00+05:30'))

console.log(newDate)
console.log(setDate)
console.log( newDate.getTime() == setDate.getTime()  ? "yes it's identical" : "No it's not ");