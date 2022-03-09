const weekDay = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


let today = new Date();
let options = {weekday: 'long'};
let todayTranslate = today.toLocaleDateString('fr-FR', options);


todayTranslate = todayTranslate.charAt(0).toUpperCase() + todayTranslate.slice(1);

let orderDays = weekDay.slice(weekDay.indexOf(todayTranslate)).concat(weekDay.slice(0, weekDay.indexOf(todayTranslate)));


export default orderDays;