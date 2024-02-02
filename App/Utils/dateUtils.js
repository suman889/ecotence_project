export const handleTimeStamp = () => {
    const startTimeISO = new Date().toISOString();
    const startTime = new Date(startTimeISO);
  
    // Format date in DD/MM/YYYY format
    const formattedDate = ('0' + startTime.getDate()).slice(-2) + '/' +
      ('0' + (startTime.getMonth() + 1)).slice(-2) + '/' + startTime.getFullYear();
  
    // Format time in 12-hour format with AM/PM
    let hours = startTime.getHours();
    let minutes = startTime.getMinutes(); // Get minutes into a separate variable
    const newFormat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes; // Modify the minutes variable
  
    const formattedTime = hours + ':' + minutes + ' ' + newFormat;
  
    return { date: formattedDate, time: formattedTime }; // Return formatted data
};