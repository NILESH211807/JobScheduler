export function dateFormat(date) {
    if (!date) return "";

    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 → 12

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}
