'use strict';
let workingHours = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm ', ' 1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm'];

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let shopearr = [];
console.log('shope array ', shopearr);


function Shope(shopName, minCustom, maxCustom, avgCookieSale) {
    this.shopName = shopName;
    this.minCustom = minCustom;
    this.maxCustom = maxCustom;
    this.avgCookieSale = avgCookieSale;
    this.coockisPerHour = [];  // random*hour
    this.total = 0;
    shopearr.push(this);
}

Shope.prototype.getRandomCustomer = function () {
    return randomNumber(this.minCustom, this.maxCustom);
};

Shope.prototype.amountsCookiesHour = function () {
    for (let i = 0; i < workingHours.length; i++) {
        this.coockisPerHour.push(Math.floor(this.getRandomCustomer() * this.avgCookieSale));
        this.total = this.total + this.coockisPerHour[i];
    }
};

let seattle = new Shope('seattle', 23, 65, 6.3);
console.log(seattle);
//Tokyo
let tokyo = new Shope('tokyo', 3, 24, 1.2);
console.log(tokyo);
//Dubai
let dubai = new Shope('dubai', 11, 38, 3.7);
console.log(dubai);
//Paris
let paris = new Shope('paris', 20, 38, 2.3);
console.log(paris);
//Lima
let lima = new Shope('lima', 2, 16, 4.6);
console.log(lima);

// creat header row

let Parent = document.getElementById('parent');
let table = document.createElement('table');
Parent.appendChild(table);

function makingHeaderCells() {

    let headingRow = document.createElement('tr');
    table.appendChild(headingRow);
    let headingTitle = document.createElement('th');
    headingRow.appendChild(headingTitle);

    for (let i = 0; i < workingHours.length; i++) {
        let headingTitle = document.createElement('th');
        headingRow.appendChild(headingTitle);
        headingTitle.textContent = workingHours[i];
    }

    let headingDailyTotal = document.createElement('th');
    headingRow.appendChild(headingDailyTotal);
    headingDailyTotal.textContent = 'Daily Location Total';
}
makingHeaderCells();

//render

Shope.prototype.render = function () {
    let data = document.createElement('tr');
    table.appendChild(data);
    let nameOfShope = document.createElement('td');
    data.appendChild(nameOfShope);
    nameOfShope.textContent = this.shopName;

    for (let i = 0; i < workingHours.length; i++) {
        let dataInRow = document.createElement('td');
        data.appendChild(dataInRow);
        dataInRow.textContent = this.coockisPerHour[i];

    }

    let totaCell = document.createElement('td');
    data.appendChild(totaCell);
    totaCell.innerText = this.total;
};

// make footer row

function makingFooterCells() {
    let footer = document.createElement('tr');
    table.appendChild(footer);
    let footerTitle = document.createElement('th');
    footer.appendChild(footerTitle);
    footerTitle.innerText = 'Totals';

    let totalForOnHoure;
    let allTotal = 0;
    for (let i = 0; i < workingHours.length; i++) {
        totalForOnHoure = 0;
        for (let j = 0; j < shopearr.length; j++) {
            totalForOnHoure = totalForOnHoure + shopearr[j].coockisPerHour[i];
            allTotal = allTotal + shopearr[j].coockisPerHour[i];
        }
        let footerData = document.createElement('th');
        footer.appendChild(footerData);
        footerData.textContent = totalForOnHoure;
    }

    let totalOfTotal = document.createElement('th');
    footer.appendChild(totalOfTotal);
    totalOfTotal.innerText = allTotal;
}
// creat new shope

// get element by id for the form
let shopesForm=document.getElementById('shopesForm');

// add the event listener
shopesForm.addEventListener('submit',newShope);

// creat newShope function
function newShope(event){
    event.preventDefault();
    console.log(event);
    let location=event.target.locationField.value;
    console.log(location);
    let min=event.target.minimumCustomers.value;
    console.log(min);
    let max=event.target.maximumCustomers.value;
    console.log(max);
    let avg=event.target.avg.value;
    console.log(avg);
    let addShope=new Shope (location,min,max,avg);
    console.log(addShope);
     table.textContent='';
    makingHeaderCells();
    for (let i = 0; i < shopearr.length; i++) {
        shopearr[i].amountsCookiesHour();
        shopearr[i].render();
    }
    makingFooterCells();
}
for (let i = 0; i < shopearr.length; i++) {
    shopearr[i].amountsCookiesHour();
    shopearr[i].render();
}

makingFooterCells();
// fotter
// makingFooterCells();

// newShope();



//console.log(seattle.randomCust);
// let seattle={
//     workingHours:['6 am','7 am', '8 am', '9 am' , '10 am', '11 am' ,'12 pm ',' 1 pm' ,'2 pm' ,'3 pm' ,'4 pm', '5 pm', '6 pm','7 pm'],
//     minSeattleCustom: 23,
//     maxSeattleCustom: 65,
//     avgCookieSale: 6.3,
//     total: 0,
//     randomCustom: [],
//     amountsOfCookies:[],
//     getRandomCustom: function(){
//     for(let i=0;i<seattle.workingHours.length;i++){
//         this.randomCustom.push(randomNumber(this.minSeattleCustom,this.maxSeattleCustom));
//     }
//     },
//     getAmountsOfCookies: function(){
//         for(let i=0;i<seattle.randomCustom.length;i++){
//             let result=this.randomCustom[i]*this.avgCookieSale;
//             result=Math.floor(result);
//             this.amountsOfCookies.push(result+' cookies');
//             this.total=this.total+result;
//         }
//     },
//     };

// seattle.getRandomCustom();
// console.log(seattle.randomCustom);

// function randomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
// seattle.getAmountsOfCookies();
// console.log(seattle.amountsOfCookies);
// console.log(seattle.total);

// let Seattle=document.getElementById('parent1');
// Seattle.innerText='seattle';
// let ulist=document.createElement('ul');
// Seattle.appendChild(ulist);
// let list=document.createElement('li');
// for(let i=0;i<14;i++){
//     ulist.appendChild(list);
//     list.innerText=seattle.workingHours[i]+': '+seattle.amountsOfCookies[i];
//     list=document.createElement('li');
// }
// ulist.appendChild(list);
// list.innerText='total: '+seattle.total;

// // Tokyo

// let tokyo={
//     workingHours:['6 am','7 am', '8 am', '9 am' , '10 am', '11 am' ,'12 pm ',' 1 pm' ,'2 pm' ,'3 pm' ,'4 pm', '5 pm', '6 pm','7 pm'],
//     minSeattleCustom: 3,
//     maxSeattleCustom: 24,
//     avgCookieSale: 1.2,
//     total: 0,
//     randomCustom: [],
//     amountsOfCookies:[],
//     getRandomCustom: function(){
//     for(let i=0;i<tokyo.workingHours.length;i++){
//         this.randomCustom.push(randomNumber(this.minSeattleCustom,this.maxSeattleCustom));
//     }
//     },
//     getAmountsOfCookies: function(){
//         for(let i=0;i<tokyo.randomCustom.length;i++){
//             let result=this.randomCustom[i]*this.avgCookieSale;
//             result=Math.floor(result);
//             this.amountsOfCookies.push(result+' cookies');
//             this.total=this.total+result;
//         }
//     },
//     };
//     tokyo.getRandomCustom();
// console.log(tokyo.randomCustom);

// function randomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
// tokyo.getAmountsOfCookies();
// console.log(tokyo.amountsOfCookies);
// console.log(tokyo.total);

// let Tokyo=document.getElementById('parent2');
// Tokyo.innerText='tokyo';
// let ulist2=document.createElement('ul');
// Tokyo.appendChild(ulist2);
// let list2=document.createElement('li');
// for(let i=0;i<14;i++){
//     ulist2.appendChild(list2);
//     list2.innerText=tokyo.workingHours[i]+': '+tokyo.amountsOfCookies[i];
//     list2=document.createElement('li');
// }
// ulist2.appendChild(list2);
// list2.innerText='total: '+tokyo.total;

// //Dubai

// let dubai={
//     workingHours:['6 am','7 am', '8 am', '9 am' , '10 am', '11 am' ,'12 pm ',' 1 pm' ,'2 pm' ,'3 pm' ,'4 pm', '5 pm', '6 pm','7 pm'],
//     minSeattleCustom: 11,
//     maxSeattleCustom: 38,
//     avgCookieSale: 3.7,
//     total: 0,
//     randomCustom: [],
//     amountsOfCookies:[],
//     getRandomCustom: function(){
//     for(let i=0;i<dubai.workingHours.length;i++){
//         this.randomCustom.push(randomNumber(this.minSeattleCustom,this.maxSeattleCustom));
//     }
//     },
//     getAmountsOfCookies: function(){
//         for(let i=0;i<dubai.randomCustom.length;i++){
//             let result=this.randomCustom[i]*this.avgCookieSale;
//             result=Math.floor(result);
//             this.amountsOfCookies.push(result+' cookies');
//             this.total=this.total+result;
//         }
//     },
//     };

//     dubai.getRandomCustom();
// console.log(dubai.randomCustom);

// function randomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
// dubai.getAmountsOfCookies();
// console.log(dubai.amountsOfCookies);
// console.log(dubai.total);

// let Dubai=document.getElementById('parent3');
// Dubai.innerText='dubai';
// let ulist3=document.createElement('ul');
// Dubai.appendChild(ulist3);
// let list3=document.createElement('li');
// for(let i=0;i<14;i++){
//     ulist3.appendChild(list3);
//     list3.innerText=dubai.workingHours[i]+': '+dubai.amountsOfCookies[i];
//     list3=document.createElement('li');
// }
// ulist3.appendChild(list3);
// list3.innerText='total: '+dubai.total;

// //Paris

// let paris={
//     workingHours:['6 am','7 am', '8 am', '9 am' , '10 am', '11 am' ,'12 pm ',' 1 pm' ,'2 pm' ,'3 pm' ,'4 pm', '5 pm', '6 pm','7 pm'],
//     minSeattleCustom: 20,
//     maxSeattleCustom: 38,
//     avgCookieSale: 2.3,
//     total: 0,
//     randomCustom: [],
//     amountsOfCookies:[],
//     getRandomCustom: function(){
//     for(let i=0;i<paris.workingHours.length;i++){
//         this.randomCustom.push(randomNumber(this.minSeattleCustom,this.maxSeattleCustom));
//     }
//     },
//     getAmountsOfCookies: function(){
//         for(let i=0;i<paris.randomCustom.length;i++){
//             let result=this.randomCustom[i]*this.avgCookieSale;
//             result=Math.floor(result);
//             this.amountsOfCookies.push(result+' cookies');
//             this.total=this.total+result;
//         }
//     },
//     };

//     paris.getRandomCustom();
//     console.log(paris.randomCustom);

//     function randomNumber(min, max) {
//         return Math.floor(Math.random() * (max - min)) + min;
//     }
//     paris.getAmountsOfCookies();
//     console.log(paris.amountsOfCookies);
//     console.log(paris.total);

//     let Paris=document.getElementById('parent4');
//     Paris.innerText='paris';
//     let ulist4=document.createElement('ul');
//     Paris.appendChild(ulist4);
//     let list4=document.createElement('li');
//     for(let i=0;i<14;i++){
//         ulist4.appendChild(list4);
//         list4.innerText=paris.workingHours[i]+': '+paris.amountsOfCookies[i];
//         list4=document.createElement('li');
//     }
//     ulist4.appendChild(list4);
//     list4.innerText='total: '+paris.total;

// //Lima

// let lima={
//     workingHours:['6 am','7 am', '8 am', '9 am' , '10 am', '11 am' ,'12 pm ',' 1 pm' ,'2 pm' ,'3 pm' ,'4 pm', '5 pm', '6 pm','7 pm'],
//     minSeattleCustom: 2,
//     maxSeattleCustom: 16,
//     avgCookieSale: 4.6,
//     total: 0,
//     randomCustom: [],
//     amountsOfCookies:[],
//     getRandomCustom: function(){
//     for(let i=0;i<lima.workingHours.length;i++){
//         this.randomCustom.push(randomNumber(this.minSeattleCustom,this.maxSeattleCustom));
//     }
//     },
//     getAmountsOfCookies: function(){
//         for(let i=0;i<lima.randomCustom.length;i++){
//             let result=this.randomCustom[i]*this.avgCookieSale;
//             result=Math.floor(result);
//             this.amountsOfCookies.push(result+' cookies');
//             this.total=this.total+result;
//         }
//     },
//     };

//     lima.getRandomCustom();
//     console.log(lima.randomCustom);

//     function randomNumber(min, max) {
//         return Math.floor(Math.random() * (max - min)) + min;
//     }
//     lima.getAmountsOfCookies();
//     console.log(lima.amountsOfCookies);
//     console.log(lima.total);

//     let Lima=document.getElementById('parent5');
//     Lima.innerText='lima';
//     let ulist5=document.createElement('ul');
//     Lima.appendChild(ulist5);
//     let list5=document.createElement('li');
//     for(let i=0;i<14;i++){
//         ulist5.appendChild(list5);
//         list5.innerText=paris.workingHours[i]+': '+paris.amountsOfCookies[i];
//         list5=document.createElement('li');
//     }
//     ulist5.appendChild(list5);
    // list5.innerText='total: '+paris.total;