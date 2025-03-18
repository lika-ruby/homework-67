const singUpBtn = document.querySelector("#sing-up-btn");
const renameBtn = document.querySelector("#rename-btn");
const deleteBtn = document.querySelector("#delete-btn");
const form = document.querySelector("#form");
const dataSection = document.querySelector("#data-section");
const nameOutput = document.querySelector("#data-name");
const emailOutput = document.querySelector("#data-email");
const telOutput = document.querySelector("#data-tel");
const adressOutput = document.querySelector("#data-adress");

let isLoging = false;
const key = "user";

const setToLocalStorage = (key, data) => {
  const arhivData = JSON.stringify(data);
  localStorage.setItem(key, arhivData);
};

const getFromLocalStorage = (key) => {
  if (Object.keys(localStorage).includes("user")) {
    const arhivData = localStorage.getItem(key);
    return JSON.parse(arhivData);
  }
};

if (Object.keys(localStorage).includes("user")) {
  if (JSON.parse(localStorage.getItem(key)).isLoging === true) {
    dataSection.style.display = "block";
    singUpBtn.style.display = "none";

    const dataStorage = getFromLocalStorage(key);
    const { name, email, tel, adress } = dataStorage;
    nameOutput.textContent = `${name}`;
    emailOutput.textContent = `${email}`;
    telOutput.textContent = `${tel}`;
    adressOutput.textContent = `${adress}`;
  }
}

singUpBtn.addEventListener("click", () => {
  if (form.style.display === "none") {
    form.style.display = "flex";
    singUpBtn.textContent = "Назад";
  } else {
    form.style.display = "none";
    singUpBtn.textContent = "Зарегеструватись";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (Object.keys(localStorage).includes("user")) {
    localStorage.removeItem("user");
  }

  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const telInput = document.querySelector("#tel");
  const adressInput = document.querySelector("#adress");
  const checkbox = document.querySelector("#checkbox");
  isLoging = true;

  const data = {
    name: `${nameInput.value}`,
    email: `${emailInput.value}`,
    tel: `${telInput.value}`,
    adress: `${adressInput.value}`,
    isLoging: isLoging,
  };

  setToLocalStorage(key, data);
  singUpBtn.style.display = "none";
  form.style.display = "none";
  dataSection.style.display = "block";
  const dataStorage = getFromLocalStorage(key);
  const { name, email, tel, adress } = dataStorage;
  nameOutput.textContent = `${name}`;
  emailOutput.textContent = `${email}`;
  telOutput.textContent = `${tel}`;
  adressOutput.textContent = `${adress}`;
  nameInput.value = "";
  emailInput.value = "";
  telInput.value = "";
  adressInput.value = "";
  checkbox.checked = false;
});

renameBtn.addEventListener("click", () => {
  form.style.display = "flex";
  dataSection.style.display = "none";
});

deleteBtn.addEventListener("click", () => {
  singUpBtn.textContent = "Зарегеструватись";
  dataSection.style.display = "none";
  singUpBtn.style.display = "block";
  if (Object.keys(localStorage).includes("user")) {
    localStorage.removeItem("user");
  }
});
