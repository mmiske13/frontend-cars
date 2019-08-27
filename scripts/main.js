let App = {
    constants: {
        apiUrl: './data/data.json'
    },
    events: {
        loadProduct: () => {
            window.onload = App.eventHandlers.onInitLoadProduct;
        },
        filterProducts: () => {
            document.getElementById('searchFilter').onkeyup = App.eventHandlers.onKeyUpFilterProduct;
        }
    },

    eventHandlers: {

        onInitLoadProduct: () => {

            //car-container element
            const parentElement = document.getElementsByClassName('car-container')[0];

            //fetch data from data.json
            fetch(App.constants.apiUrl)
                .then((resp) => resp.json())
                .then(data =>
                {
                    //cars from data file
                    let cars = data.cars;
                    // loop through array of cars
                    cars.forEach(function (car) {
                        //creating car cell div for each car
                        let carDiv = App.helpers.createNode('div');
                        carDiv.classList.add('cars-cell');

                        //creating car card div for each car
                        let carCard = App.helpers.createNode('div');
                        carCard.classList.add('car-card');

                        //creating paragraph for speed
                        let carSpeed = App.helpers.createNode('p');
                        carSpeed.classList.add('car-speed');
                        carSpeed.innerHTML = "Speed: " + car.speed;

                        //creating paragraph for desc
                        let carDesc = App.helpers.createNode('p');
                        carDesc.classList.add('car-desc');
                        carDesc.innerHTML = "Description: " + car.description;

                        //creating image
                        let carImage = App.helpers.createNode('img');
                        carImage.src = car.image;

                        //creating paragraph for name
                        let carName = App.helpers.createNode('p');
                        carName.classList.add('car-name');
                        carName.innerHTML = car.name;

                        //appending html into carDiv
                        App.helpers.append(carCard, carSpeed);
                        App.helpers.append(carCard, carDesc);
                        App.helpers.append(carCard, carName);
                        App.helpers.append(carCard, carImage);
                        App.helpers.append(carDiv, carCard);

                        //appending carDiv into car-container
                        App.helpers.append(parentElement, carDiv);
                    })
                })
        },
        onKeyUpFilterProduct: () => {
            //declaring variables
            let input = document.getElementById('searchFilter');
            let filter = input.value.toUpperCase();
            let carCard = document.getElementsByClassName('car-card');
            let carName = document.getElementsByClassName('car-name');

            //loop through elements with car-card class
            for (let i = 0; i < carCard.length; i++) {

                //get carName for each element with car-card class
                let p = carName[i];
                let textValue = p.textContent || p.innerText;

                if (textValue.toLocaleUpperCase().indexOf(filter) > -1) {
                    carCard[i].style.display = "";
                } else {
                    carCard[i].style.display = "none";
                }
            }
        }
    },
    helpers: {
        createNode: function (element) {
            return document.createElement(element);
        },
        append: function (parent, element) {
            parent.appendChild(element);
        }
    },

    init: function () {
        App.events.loadProduct();
        App.events.filterProducts();
    }
};

App.init();
