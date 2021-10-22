export const dateConversion = (dateTime) => {
    const time = new Date(dateTime);
    const hours = time.getHours() % 12;
    const mins = time.getMinutes();
    const month = time.toLocaleString("default", { month: "short" });
    console.log(month);

    const date = time.getDate();
    const dateString = `${month} ${date} ${hours}:${mins}`;
    return dateString;
};
