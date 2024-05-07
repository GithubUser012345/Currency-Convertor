let latest;
//exchange rate on perticular date YYYY-M0-DA;
latest = prompt(`Enter Todays Date YYYY-MO-DA to proceed`);
let baseUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${latest}/v1/currencies`;

let selects = document.querySelectorAll("select");
let btn = document.querySelector(".btn");
let input = document.querySelector("input");
let imgs = document.querySelectorAll("img");
let fromInput = document.querySelector(".from-select select");
let toInput = document.querySelector(".to-select select");
let msg = document.querySelector(".msg");

for(let select of selects){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" & currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" & currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (eve)=>{
        console.log(eve);
        updateFlag(eve.target);
    });
}

function updateFlag(targetElement) {
    let currCode = targetElement.value; // INR
    let countryCode = countryList[currCode]; //IR
    console.log(currCode, countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = targetElement.parentElement.querySelector("img");
    img.src = newSrc;
}

async function exchangeRate(){
    let url = `${baseUrl}/${fromInput.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let fromCurr = fromInput.value.toLowerCase();
    let toCurr = toInput.value.toLowerCase();
    let rate = amount* data[fromCurr][toCurr];
    console.log(amount* data[fromCurr][toCurr]);

    msg.innerText = `${amount} ${fromCurr.toUpperCase()} =  ${rate} ${toCurr.toUpperCase()}`;

}

btn.addEventListener("click", ()=>{
    if (input.value === "" || input.value <= 0){
        input.value = 1;
        amount = input.value;
    }else{
        amount = input.value;
    }
    console.log(amount);
    exchangeRate();
});


