const hartCount = document.getElementById("hart_count");
const allHartBtn = document.querySelectorAll(".hartIcon");

let countHart = 0;

for (let i = 0; i < allHartBtn.length; i++) {
  const ele = allHartBtn[i];
  ele.addEventListener("click", function () {
    countHart++;
    hartCount.innerText = countHart;
  });
}

// Call btn Task
const buttons = document.getElementsByClassName("call");

for (let i = 0; i < buttons.length; i++) {
  const btn = buttons[i];

  btn.addEventListener("click", function (event) {
    const parent = event.target.parentElement;
    const parentOfParent = parent.parentElement;

    const titelElement = parentOfParent.querySelector("#titel");
    const numberElement = parentOfParent.querySelector("#number");
    const title = titelElement.innerText;
    const number = numberElement.innerText;
    alert(`${title} ${number}`);

    // count btn task
    const countCoin = parseInt(document.getElementById("coin_count").innerText);
    const totalCoin = countCoin - 20;

    // validation
    if (totalCoin < 0) {
      alert("You have not enough coin");
      return;
    }

    // new balance added
    document.getElementById("coin_count").innerText = totalCoin;

    // clear Button
    document.getElementById("clear_btn").addEventListener("click", function () {
      document.getElementById("isthoryMsg").innerText = "";
    });

    const historyDiv = document.getElementById("isthoryMsg");

    // history massage added with real time 
    const newDiv = document.createElement("div");
    const nowTime = new Date();
    const dateStr = nowTime.toLocaleString();
    newDiv.innerText = `${title} ${number} - ${dateStr}`;
    historyDiv.appendChild(newDiv);
    newDiv.style.padding = "10px";
    newDiv.style.marginBottom = "10px";
    newDiv.style.backgroundColor = "lightGray";
    newDiv.style.border = "1px solid #ccc";
    newDiv.style.borderRadius = "10px";
  });
}

// Copy button
const copyCountDisplay = document.getElementById("copyCount");
const copyButtons = document.querySelectorAll(".copy_btn");

let copy_count = 0;

for (let i = 0; i < copyButtons.length; i++) {
  const btn = copyButtons[i];

  btn.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    const parentOfParent = parent.parentElement;
    const number = parentOfParent.querySelector("#number").innerText;
    navigator.clipboard.writeText(number).then(() => {
      alert("Copied number: " + number);
    });
    copy_count++;
    copyCountDisplay.innerText = copy_count;
  });
}
