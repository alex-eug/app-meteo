//search city by zip code
const city = document.querySelector('#city')
const geoApi = "https://geo.api.gouv.fr/communes"
let select; 

const searchCity = () => {
    const formButton = document.querySelector('.form-button')
    formButton.addEventListener('click', () => {
        const zipCode = document.querySelector('#zipcode')
        let postal = zipCode.value
        let url = `${geoApi}?codePostal=${postal}&format=json`
        console.log(url);
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((response => {
                console.log(response);
                if (response.length) {
                    response.forEach((elm) => {
                        console.log(elm.nom);
                     const optionElm = document.createElement('option')
                     optionElm.setAttribute("value",elm.nom)
                     optionElm.classList.add("option-element")
                     optionElm.innerText = elm.nom
                     city.appendChild(optionElm)
                    
                    });
                    city.addEventListener('change', (event) => {
                        // const result = document.querySelector('.result');
                        console.log(event.target.value);
                        select = event.target.value

                      })
                     
                }else{
                    console.log("code postale invalide");
                }
            })).catch(err => {
                console.log(err);
            })
    })
}




export default searchCity