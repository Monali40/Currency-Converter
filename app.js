const BASE_URL ="https://stocks.algobook.info/api/v1/exchange/rate?";

const dropdownSelects =document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");


for (let select of dropdownSelects){
for (currcode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
       
        if(select.name === "from" && currcode === "USD")
            {
                newOption.selected ="selected";
            }
            else if (select.name === "to" && currcode === "INR")
                {
                    newOption.selected = "selected";
                }
    select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currcode = element.value;
   // console.log(currcode); //INR,USD
    let countryCode = countryList[currcode];
   // console.log(countryCode); //IN,US
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector (".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1)
        {
            amtval = 1;
            amount.value = "1";
        }

//console.log(fromCurr.value,toCurr.value);

const URL = `${BASE_URL}from=${fromCurr.value}&to=${toCurr.value}`;
let response = await fetch(URL);
//console.log(response);

let data = await response.json(); // Parse the response data as JSON
console.log(data); // Log the data received from the API
let rate = data.rate; // Accessing rate directly from data
//console.log(rate);
let finalAmount = amtval * rate;

msg.innerText =`${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;



});