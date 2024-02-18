export function formValidation(nameInputElement, textInputElement, buttonElement) {
    nameInputElement.classList.remove("error");
    textInputElement.classList.remove("error");
  
    if (nameInputElement.value === "" && textInputElement.value === "") {
      nameInputElement.classList.add("error");
      textInputElement.classList.add("error");
      buttonElement.disabled = true;
      return;
    }
  
    if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
      buttonElement.disabled = true;
      return;
    }
  
    if (textInputElement.value === "") {
      textInputElement.classList.add("error");
      buttonElement.disabled = true;
      return;
    }
  }