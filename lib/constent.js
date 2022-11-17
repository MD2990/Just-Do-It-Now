const colors = { blue: '#00203FFF', green: '#ADEFD1FF' };






 //  get the current date and time
  export const getDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const hh = String(today.getHours()).padStart(2, "0");
    const min = String(today.getMinutes()).padStart(2, "0");
    const sec = String(today.getSeconds()).padStart(2, "0");
    const currentDate =
      yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + sec;
    return currentDate;
  };



export { colors };
