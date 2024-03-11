export function formValidation(textInputElement, buttonElement) {
    setTimeout(() => {
      textInputElement.classList.remove("error");
  }, 2000);
  
    if (textInputElement.value === "") {
      textInputElement.classList.add("error");
      buttonElement.disabled = true;
      return;
    }
  }

  

  