let form = document.querySelector(".form");
let header = document.querySelector(".header");

let input = document.querySelector(".input");
let searchBtn = document.querySelector(".search-btn");
let addBtn = document.querySelector(".add-btn");
let submitBtn = document.querySelector(".submit-btn");

let name = document.querySelector(".name");
let age = document.querySelector(".age");
let mobileNo = document.querySelector(".m-number");

let showDetails = document.querySelector(".showDetails");
let container = document.querySelector(".container");

let display = document.querySelector(".display");
let displayName = document.querySelector(".display-name");
let displayAge = document.querySelector(".display-age");
let displayMobNo = document.querySelector(".display-m-number");
let closeBtn = document.querySelector(".close-btn");
let deleteBtn = document.querySelector(".delete-btn");

let exportBtn = document.querySelector(".export-btn");

// let userInfoDetails = document.querySelector(".user-details");

let userDetails1 = [];

let userDetails = JSON.parse(localStorage.getItem("uDetails")) || userDetails1;

function getDetyails({ name, age, mNumber }) {
  let userDetailsNode = document.createElement("div");

  userDetailsNode.classList.add("user-details");

  let nameNode = document.createElement("div");
  let ageNode = document.createElement("div");
  // let mobileNoNode = document.createElement("div");

  nameNode.innerHTML = name;
  ageNode.innerHTML = age;
  // mobileNoNode.innerHTML=mNumber;

  userDetailsNode.appendChild(nameNode);
  userDetailsNode.appendChild(ageNode);
  // userDetailsNode.appendChild(mobileNoNode);

  userDetailsNode.addEventListener("click", () => {
    displayName.innerHTML = name;
    displayAge.innerHTML = age;
    displayMobNo.innerHTML = mNumber;

    display.style.visibility = "visible";
    container.style.visibility = "hidden";

    deleteBtn.addEventListener("click", () => {
      userDetails = userDetails.filter((e) => e.name != name);
      console.log(userDetails);
      localStorage.setItem("uDetails", JSON.stringify(userDetails));

      display.style.visibility = "hidden";
      container.style.visibility = "visible";
      init();
    });
  });

  return userDetailsNode;
}

function init() {
  showDetails.innerHTML = "";
  for (let obj in userDetails) {
    console.log(userDetails[obj]);
    let card = getDetyails(userDetails[obj]);
    showDetails.append(card);
  }
}

// function searchByName() {
//   let tempObj = userDetails;
//   let inputVal = input.value;

//   tempObj = tempObj.filter((e) =>
//     e.name.toLowerCase().includes(inputVal.toLowerCase())
//   );
// showDetails.innerHTML = "";
// for (let obj in tempObj) {
//   console.log("bhai", tempObj[obj]);
//   let card = getDetyails(tempObj[obj]);
//   showDetails.append(card);
//   }
// }

function searchUsingDebouncing(fn,delay){
  let id;
  return function(...args){
    clearTimeout(id);
    id=setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}

function searchedData(data) {
  let tempObj = userDetails;
  let searchedInput = data;
  tempObj = tempObj.filter((e) =>
    e.name.toLowerCase().includes(searchedInput.toLowerCase())
  );
  showDetails.innerHTML = "";
  for (let obj in tempObj) {
    console.log("bhai", tempObj[obj]);
    let card = getDetyails(tempObj[obj]);
    showDetails.append(card);
  }
}

const searchByName = searchUsingDebouncing(searchedData, 500);

function clearInputData() {
  name.value = "";
  age.value = "";
  mobileNo.value = "";
}

addBtn.addEventListener("click", () => {
  form.style.visibility = "visible";
  container.style.visibility = "hidden";
});

submitBtn.addEventListener("click", () => {
  container.style.visibility = "visible";
  form.style.visibility = "hidden";

  const obj = {};
  obj.name = name.value;
  obj.age = age.value;
  obj.mNumber = mobileNo.value;
  userDetails.push(obj);
  localStorage.setItem("uDetails", JSON.stringify(userDetails));
  init();
  clearInputData();
});

// searchBtn.addEventListener("click", () => {
//   searchByName();
// });

input.addEventListener("input", (e) => {
  searchByName(e.target.value);
});

closeBtn.addEventListener("click", () => {
  display.style.visibility = "hidden";
  container.style.visibility = "visible";
});

exportBtn.addEventListener("click", () => {
  let fileName = "export";
  let exportObj = localStorage.getItem("uDetails");
  const blob = new Blob([JSON.stringify(exportObj, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

init();
