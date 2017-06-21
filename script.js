//Reference http://es6-features.org

/////////////////////////////////////////
//Variable declarations with let and const

/*
//ES5
var name = "Tom";
var age = 29;
name = "Tom Ben";
console.log(name);  //Tom Ben

//ES6
const name = "Tom";  //const value wont change
let age = 29;
name = "Tom Ben";
console.log(name);  //Error - Assignment to const variable
*/


/*
* In ES6, let and const are Block Scoped
* var is Function Scoped
* variabes declared with let are not Hoisted in ES6
*/

/*
//ES5
function drivingLicenceTest5(passed) {
    if(passed) {
        console.log(name);    //Undefined because of hoisting
        var name = 'Jerry';
        var yearOfBirth = 1990;
    }
    console.log(name+ " ,born in "+yearOfBirth+" is allowed to drive a car");
}
drivingLicenceTest5(true);

//ES6
function drivingLicenceTest6(passed) {
    if(passed) {
        console.log(name);    //ERROR, name is not defined as variables with let are not hoisted
        console.log(test);
        let name = 'Jerry';
        const yearOfBirth = 1990;
        var test = 'Test';
    }
    //let and const are Block Scoped, hence will not be available outside the block
    console.log(name+ " ,born in "+yearOfBirth+" is allowed to drive a car");  //ERROR: yearOfBirth not defined. Solution: Define them outside block
}
drivingLicenceTest6(true);
*/

/*
//Another example of let being Block Scoped
let i = 30;
for(let i=0;i<10;i++) {  //this i behaves as a new variable and doesnt overwrite one outside
    console.log(i);      //outputs 1 to 9
}
console.log(i);  //outputs 30 


// var being function scoped gets overwritten
var i = 30;
for(var i=0;i<10;i++) {  //overwrites i outside
    console.log(i);      //outputs 1 to 9
}
console.log(i);  //outputs 5
*/


///////////////////////////////////////////////
//Blocks and IIFEs

/*
//In ES6, Data Privacy can be achieved easily by creating a block with {}
{
    let a = 10;
    const b = 5;  // a and b become private to this block
    var c = 3;
}
console.log(c);   //3
console.log(a+b); //ERROR a and b are not defined. As a and b are block scoped, made use of that and created them inside a block for privacy

//ES5
(function() {
    var c = 6;
})();
console.log(c);  //ERROR c is not defined. Made use of rule that, var is function scoped and created a variable inside a function for privacy 
*/

/////////////////////////////////////////////////
//Strings and Template Literals in ES6


//ES6 introduced template literals with backticks and then variables can be used within template literals using ${variable_name}

let firstName = "Sandhya";
let lastName = "B";
const yearOfBirth = 1988;

function calcAge(year) {
    return 2017-year;
}


//ES5
console.log("This is "+firstName+" "+lastName+', born in '+yearOfBirth+
           ' and Today she is '+calcAge(yearOfBirth)+ ' years old.');


//ES6
console.log(`This is ${firstName} ${lastName}, born in ${yearOfBirth} and Today she is `+
             `${calcAge(yearOfBirth)} years old.`);


//ES6 String methods
const name = `${firstName} ${lastName}`;
console.log(name);                  //Sandhya B
console.log(name.startsWith('Sa')); //true
console.log(name.endsWith('b'));    //false , case sensitive
console.log(name.includes(' '));    //true
console.log(`${name} `.repeat(5));  //Sandhya B Sandhya B Sandhya B Sandhya B Sandhya B


/////////////////////////////////////////////////
//Arrow Functions

const years = [1987, 1983, 1984, 1990];

//ES5
var ages5 = years.map(function(el) {
    return 2017-el; 
});
console.log(ages5);            //[30, 34, 33, 27]

//ES6
/*
*  Arrow function ()=>{} 
*  with Single parameter and Single line of code, no parenthesis for arguments and no return statement required. it can be, arg => 2017-arg 
*  with Multiple parameter and Single line of code, parenthesis are required for arguments and no return statement required.  
*    it can be, (arg1,arg2) => `At ${arg2}, 2017-${arg1}`
*  with Multiple parameter and Mutiple lines of code, parenthesis are required for arguments and return statement is required.  
*    it can be, (arg1,arg2) => {
*                    const year = 2017;
*                    return `At ${arg2}, ${year}-${arg1}`
*                 }
*/

var ages6 = years.map((el)=>{
    return 2017-el;
});
console.log(ages6);            //[30, 34, 33, 27]

ages6 = years.map((el,index)=>
                    `Age element at ${index}: ${2017-el}.`
                 );

console.log(ages6);            //["Age element at 0: 30.", "Age element at 1: 34.", "Age element at 2: 33.", "Age element at 3: 27."]


/////////////////////////////////////////
//Arrow Functions: Lexical 'this' keyword

/*
* Biggest advantage of Arrow Functions share the surrounding 'this' keyword
* They do not have their own 'this' keyword but they use one of the function they are written in
* Thats why we say they have lexical 'this' variable
*/

/* Points to be Noted
Only in method call, this keyword points to current Object
whereas in regular function call, this keyword always points to global Object
*/


//ES5
var box5 = {
    color: 'green',
    position: 1,
    /*
    clickMe: function() {
        document.querySelector('.green').addEventListener('click',function() {  //this function here is a regular function call and do not have access to cur obj
            var str = 'This is box number '+this.position+' and it is in '+this.color;   //This is box number undefined and it is in undefined
            alert(str);
        });
    }
    */
    //Solution: store the this variable in a local variable
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click',function() {  //this function here is a regular function call and do not have access to cur obj
            var str = 'This is box number '+self.position+' and it is '+self.color;   //This is box number 1 and it is in green
            alert(str);
        });
    }
}
//box5.clickMe();



//ES5 Similar example with another trick
var Person = function(name) {
    this.name = name;
}
Person.prototype.myfriends = function(friends) {        //Though this function has access to current object
    /*
    var friendship = friends.map(function(el) {          //function here do not have access to this object
        return this.name+ " is friends with "+el;
    })
    console.log(friendship);                             //[" is friends withTom,Jerry", " is friends withTom,Jerry"]
    */
    //Solution with bind()
    var friendship = friends.map(function(el) {          //function here do not have access to this object
        return this.name+ " is friends with "+el;
    }.bind(this));                                       //creates a copy of this function with the this variable
    console.log(friendship);                             //["John is friends with Tom", "John is friends with Jerry"]
}
var friends = ["Tom","Jerry"];
var john = new Person('John');
john.myfriends(friends);




//ES6 - Use Arrow functions to avoid the hack "self = this" in line 188
var box6 = {
    color: 'green',
    position: 1,
    //clickMe: () => {      //if we use arrow function here, this will also share the lexical this keyword from surrounding which will be global object
    clickMe: function() {
        document.querySelector('.green').addEventListener('click',() => {  
            var str = 'Hi! This is box number '+this.position+' and it is in '+this.color;   //"this" keyword has access to current object using arrow function
            alert(str);
        });
    }
}
box6.clickMe();      //Hi! This is box number 1 and it is in green


//ES6 Similar example
var Person = function(name) {
    this.name = name;
}
Person.prototype.myfriends6 = function(friends) {        //This function has access to current object
    var friendship = friends.map(el =>                  //Arrow function shares the sorrounding this object
         `${this.name} is friends with ${el}`
    )                                   
    console.log(friendship);                             //["Mike is friends with Tom", "Mike is friends with Jerry"]
}
var friends = ["Tom","Jerry"];
new Person('Mike').myfriends6(friends);

/////////////////////////////
//Destructuring

/*
* Destructuring gives us a very convenient way to extract the data from data structure like an object or an array
* const [name,age] = ['Ben',35]
* Here, we constructed the data structure and then destructured using [name,age]
*/

//ES5 
var john = ["John", 26];
console.log(john[0]);
console.log(john[1]);

//ES6 - Destructuring an array
const [employee_name,age] = ["Tom", 27];
console.log(employee_name); 
console.log(age);

//ES6- Destructuring an Object
var obj = {
    emp_firstName: 'Sandhya',
    emp_age: 29
}

//Note: Use curly braces to destructure an obj as obj is structured with curly braces
//keys in destruture should match with that of keys in object
const {emp_firstName, emp_age} = obj;
console.log(emp_firstName);           //Sandhya
console.log(emp_age);                 //29

//For different keys other than ones in object
const {emp_firstName: n, emp_age: a} = obj;
console.log(n);                       //Sandhya
console.log(a);                       //29


//Another more pratical example
function calcRetirementAge(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65-age];
}
//Destructure to store the returned array in different variables
const [curr_age,retirement] = calcRetirementAge(1990);
console.log(curr_age);       //27
console.log(retirement);     //38


//////////////////////////////////////////////
//Arrays in ES6

/*
* from() - converts nodeList into Array. Syntax: Array.from(fieldsList)
* Loops for of - forEach and map doesnt allow to use break or continue. for(let hero of heroes) { if(hero.name == 'Bose') continue; }
* find and findIndex methods
* findIndex: we can pass callback function into it and it returns index of the array where callback function returns true
*/

const boxes = document.querySelectorAll('.box');

/*
//ES5 - ToDo this is working even without converting into array
var box5Arr = Array.prototype.slice.call(boxes);  //to convert nodeList to an array to use forEach() method on it
box5Arr.forEach(function(el) {
    el.style.backgroundColor = 'green';
})

//ES5 Loops
for(var i=0;i<box5Arr.length;i++) {
   if(box5Arr[i].className === 'green box') {
      continue;
    } 
    box5Arr[i].textContent = 'I \'m changed to green';
}
*/


//ES6 - uses from() method to convert Nodelist into array
var box6Arr = Array.from(boxes);
box6Arr.forEach(el =>
                    el.style.backgroundColor = 'blue'
               )


//ES6 Loops
for(const box of box6Arr) {
    if(box.className.includes('blue')) {    //uses ES6 feature method includes()
       continue;
    }
    box.textContent = 'I \'m changed to blue';
}


var stud_ages = [10,20,17,19];
var adults = stud_ages.map(function(el) {
   return el >= 18;
});
console.log(adults);                //[false, true, false, true]
console.log(adults.indexOf(true));  //returns index of first passing element which is 1
console.log(stud_ages[adults.indexOf(true)]);  //20


//ES6 findIndex and find methods
console.log(stud_ages.findIndex(el => el>=18)); //1
console.log(stud_ages.find(el => el>=18));      //20

/////////////////////////////////////////////
// Spread Operator


/*
*   ...ages: spread operator expands array ages into its components
*   joining arrays: [...familyone, ...familytwo]
*   spread operator can be applied on other similar data structures such as NodeList
*/

function add(a,b,c,d) {
    return a+b+c+d;
}
console.log(add(1,3,89,23));    //116

var numbers = [10,22,3,4];

//ES5
var sum5 = add.apply(null,numbers);
console.log("ES5: Using apply method "+sum5);  //ES5: Using apply method 39

//ES6
const sum6 = add(...numbers);
console.log("ES6: Using Spread Operator "+sum6); //ES6: Using Spread Operator 39

//ES6- Joining Arrays
const familyOne = ["Mike", "Ben"];
const familyTwo = ["Anne", "Craig"];

const jointFamily = [...familyOne, "Tom", ...familyTwo];
console.log(jointFamily);      //["Mike", "Ben", "Tom", "Anne", "Craig"]


//Spread operator can be used on other type of data structures as well
const h = document.getElementsByTagName('h1')[0];
const boxList = document.querySelectorAll('.box');

const all = [h,...boxList];

Array.from(all).forEach(el => el.style.color = 'purple');


//Other examples
var params = [ "hello", true, 7 ]
var other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ]

function f (x, y, ...a) {
    return (x + y) * a.length
}
console.log(f(1, 2, ...params));  //9

var str = "foo"
var chars = [ ...str ] 
console.log(chars);    //["f", "o", "o"]


/////////////////////////////////////
//Rest Parameters

/*
*   Rest Parameters allow us to pass an arbitrary number of arguments into a function
*   Rest Parameters uses same notation as spread operator but is exact "opposite of Spread Operator" because
*     Spread operator takes an array and transforms it into single values whereas 
*     Rest Parameters receive a couple of single values and transforms them into an array when we call a function with multiple parameters
*   Difference between Spread Operator and Rest Parameters is the place in which we make use of them
*     Spread Operator - used in function call
*     Rest Parameters - used in function declaration to pass arbitrary number of arguments
*/


//ES5
/* To receive an undefined number of arguments in a function,then no parameters are defined in function and then just use arguments keyword
*  arguments variable is similar to this variable and iits a variable each execution context gets access to
*  arguments is an array-like structure but not an array. To use it as parameter or to loop through it, first we need to transform it into array
*
*/
/*
function isFullAge5() {
    //console.log(arguments);                            //[1990, 1988, 1996, callee: function, Symbol(Symbol.iterator): function]
    var argsArr = Array.prototype.slice.call(arguments);
    argsArr.forEach(function(curr) {
        console.log((2017-curr)>=18);                    //true true true
    });
    
}
isFullAge5(1990, 1988,1996);                            //this function now works for any number of arguments


//ES6
function isFullAge6(...years) {                          //As soon as the function is called, arguments are converted into an array using spread operator
    //console.log(years);                                //outputs an array
    years.forEach(curr => 
        console.log((2017-curr)>=18)                     //true false flase true
    );
}
isFullAge6(1990,2000,2015,1988);
*/


//Another Similar Example: passing one definite argument along with other arbitrary arguments
function isFullAge5(limit) {
    //console.log(arguments);                               //[1990, 1988, 1996, callee: function, Symbol(Symbol.iterator): function]
    var argsArr = Array.prototype.slice.call(arguments,1);  //starts slicing from argument at position 1
    argsArr.forEach(function(curr) {
        console.log((2017-curr)>=limit);                    //true true true
    });
    
}
isFullAge5(1990, 1988,1996);                             //this function now works for any number of arguments


//ES6
function isFullAge6(limit,...years) {                    //As soon as the function is called, arguments are converted into an array using spread operator
    //console.log(years);                                //outputs an array
    years.forEach(curr => 
        console.log((2017-curr)>=limit)                  //true false flase true
    );
}
isFullAge6(21,1990,2000,2015,1988);



////////////////////////////////////
//Default Parameters

/*
*   We use Default Parameters when we want one or more parameters to be preset
*/

//Note: JavaScript allows us to call functions without specify all the arguments

//ES5 
function ThomasFamily(firstName,lastName,nationality) {
    //adding default values
    lastName = (lastName === undefined) ? 'Thomas' : lastName;
    nationality = (nationality === undefined) ? 'British' : nationality;
    this.firstName = firstName;
    this.lastName = lastName;
    this.nationality = nationality;
}
var emily = new ThomasFamily('Emily');  //sets lastName and nationality to undefined
console.log(emily);                     //{firstName: "Emily", lastName: "Thomas", nationality: "British"}

var tom = new ThomasFamily('Tom','Cruise','American');
console.log(tom);                       //{firstName: "Tom", lastName: "Cruise", nationality: "American"}


//ES6
function ModiFamily(firstName, nationality = "Indian") {
    this.firstName = firstName;
    this.nationality = nationality;
}
var sandy = new ModiFamily('Sandhya');
console.log(sandy);                      //{firstName: "Sandhya", nationality: "Indian"}

var ben = new ModiFamily('Ben','British');
console.log(ben);                        //{firstName: "Ben", nationality: "British"}



////////////////////////////////////////////
//Map - New Data Structure introduced in ES6

/*
*   A Map is a new Key-value data structure in ES6 and any primitve value can be used for key unlike object
*   we can be fetch the "size" of the map unlike object
*   we can "set" and "get" data
*   we can "delete" data
*   "has(key)" to check if data with a key exists
*   delete all the data, use "clear()"
*   Maps are iterable - forEach((value,key) => {}) , for(let [key,value] of question.entries()) {}
*   Hence, Maps are better way than objects to create hash maps: 
*     1) any primitive value can be used as key 2)easy to get map size 3)maps are iterable 4)easily add remove data from a map
*/

const question = new Map();

question.set('question' , 'JavaScript current version?');     //uses string as key
question.set(1, 'ES5');                                       //uses number as key
question.set(2, 'ES2015');
question.set(3, 'ES7');
question.set('correct', 2);
question.set(true, 'Correct Answer!');                        //uses boolean as key
question.set(false, 'Wrong, Please try again!');

console.log(question);                                        //{"question" => "JavaScript current version?", 1 => "ES5", 2 => "ES2015", 3 => "ES7", "correct" => 2…}

console.log(question.get('question'));                        //JavaScript current version?
console.log("Size of the map: "+question.size);                //Size of the map: 7

if(question.has(3)) {
   //question.delete(3);
}

//question.clear();

//Iterating over Map - forEach
question.forEach((value,key) => {
    if(typeof(key) == 'number') {
       console.log(`${key}: ${value}`)
    }
});

//for of
for(let [key,value] of question.entries()) {
    if(typeof(key) == 'number') {
       console.log(`${key}: ${value}`)
    }
}

const ans = parseInt(prompt("Enter answer"));
console.log(question.get(question.get('correct') === ans));    //Advantage of using boolean as key. No need to write if else statement

/*
if(question.get('correct') == ans) {
    console.log(question.get(true));
}
else {
    console.log(question.get(false));
}
*/


//////////////////////////////
//Classes

/*
*   Classes do not add anything new to the language, they are just syntactical sugar to the way we do prototypical inheritance in JavaScript
*   Makes it easy to implement inheritance and create new objects based on blueprints (which are called Function contructors in ES5)
*   Static Methods: Methods attached to a class but not inherited by object instances
*   Class Definitions are not Hoisted. Unlike function constructors, we need to first implement a class and only then we can start using it in our code
*   We can add only methods to classes but not properties. Inheriting properties to Object instances is not a best practice anyway.
*/


/*
//ES5
var Student = function(name,std,year) {
    this.name = name;
    this.std = std;
    this.year = year;
}
Student.prototype.calcAge = function() {
    console.log(2017-this.year);
}

var jerry = new Student('Jerry',9,1997);
jerry.calcAge();  //20
*/


//ES6
class Student {
    constructor(name,std,year) {
        this.name = name;
        this.std = std;
        this.year = year;
    }
    static greeting() {                    //static method attached to class but not inherited by object instances
        console.log("Hi! there..");
    }
    calAge() {
        console.log(2017-this.year);
    }
}

var jerry = new Student('Jerry',9,1997);
jerry.calAge();  //20

Student.greeting();       //calling static method using classname as beind scenes a class is also a function and methods can be attached to it



//////////////////////////////////////
//Inheritance 

/*
Person - name, yearOfBirth, job, calculateAge()
Athelete - olympics, medals, wonMedal()

Athelete inherits Person

Athelete - olympics, medals, wonMedal(), name, yearOfBirth, job, calculateAge()
*/

//ES5
var Person5 = function(name,yearOfBirth,job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
Person5.prototype.calculateAge = function() {
    console.log(2017-this.yearOfBirth);
}

var Athlete5 = function(name,yearOfBirth,job,olympics,medals) {
    
    Person5.call(this,name,yearOfBirth,job);
    
    this.olympcis = olympics;
    this.medals = medals;
}

//To create correct prototype chain because Object.create() allows us to manually set prototype of object
//Athlete5 inherits Person5
Athlete5.prototype = Object.create(Person5.prototype);

//only Athlete5 instances can use this method. Person5 instances cannot use this
Athlete5.prototype.wonMedal = function() {
     console.log(`${this.name} won ${this.medals} medals`);
}

var ushaAthlete5 = new Athlete5('Usha', 1990, 'Runner', 3, 10);
ushaAthlete5.calculateAge();  //27
ushaAthlete5.wonMedal();      //Ushawon 10 medals



//ES6
class Person6 {
    constructor(name,yearOfBirth,job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    static greeting() {                    //static method attached to class but not inherited by object instances
        console.log("Hi! there..");
    }
    calAge() {
        console.log(2017-this.yearOfBirth);
    }
}

class Athlete6 extends Person6 {
     constructor(name,year,job,olympics,medals) {
        super(name,year,job);
        this.olympics = olympics;
        this.medals = medals;
    }
    wonMedal() {
        console.log(`${this.name} won ${this.medals} medals`);
    }
}
var vijay = new Athlete6('Vijay',1988,'Boxer',3,7);
vijay.calAge();   //29
vijay.wonMedal(); //Vijay won 7 medals



/////////////////////////////////
//Transpilation with Babel

/*
- install nodej,npm
- downlad babel package : npm install --save-dev babel-preset-es2015 babel-polyfill
- Transpile script.js written in ES: 
   ./node_modules/.bin/babel --presets es2015 script.js --out-file script-transpiled.js
- Replace script.js with script-transpiled.js in index.html file
- code for features which are new in ES6 such as Map do not get transpiled with above
- include polyfill.min.js from node_modules/babel-polyfill/dist/polyfill.min.js in index.html file
*/























