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
























