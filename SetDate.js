export function setDate() {
    let addTimeElement = new Date();
    let year = addTimeElement.getFullYear().toString().slice(-2);
    let minutes =
      addTimeElement.getMinutes() < 10
        ? "0" + addTimeElement.getMinutes()
        : addTimeElement.getMinutes();
    let hours =
      addTimeElement.getHours() < 10
        ? "0" + addTimeElement.getHours()
        : addTimeElement.getHours();
    let date =
      addTimeElement.getDate() < 10
        ? "0" + addTimeElement.getDate()
        : addTimeElement.getDate();
    let month =
      addTimeElement.getMonth() < 10
        ? "0" + addTimeElement.getMonth()
        : addTimeElement.getMonth();
  
    let newDate = `${date}.${month + 1}.${year}
        ${hours}:${minutes}`;
    return;
  }