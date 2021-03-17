//Constants taxes
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

//Constant products
const products = [{
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

//Creating the elements
var container = document.getElementById("product-list-container");

var createProductDescription = product => {
    var li = document.createElement("li");
    li.setAttribute("class", "product-description")
    li.innerText = product.description + "          ";
    li.appendChild(createProductInput(product))
    container.appendChild(li);
}

var createProductInput = product => {
    var input = document.createElement("input");
    input.setAttribute("class", "product-unit");
    input.setAttribute("type", "number");
    input.setAttribute("min", "0")
    input.setAttribute("max", product.stock);
    input.addEventListener("change", event => {
        product.units = event.target.valueAsNumber;
        isEmpty(products);
    });
    return input;
}


//Showing the elements
var showProductDescription = productsList => {
    for (var product of productsList) {
        createProductDescription(product);
    }

}

var showProductInput = productsList => {
    for (var product of productsList) {
        createProductInput(product);
    }
}

var showElements = productsList => {
    showProductDescription(productsList)
    showProductInput(productsList)
}

showElements(products)

//Checking if it does what we want
document.getElementById("check-btn").addEventListener("click", () => console.log(products))

//Calculating taxes
var whichTax = product => {
    var tax = 0;

    if (product.tax === REGULAR_TYPE) {
        tax = REGULAR_TYPE;
    }   else if (product.tax === LOWER_TYPE) {
        tax = LOWER_TYPE;
    } else {
        tax === EXEMPT_TYPE;
    }

    return tax;
}

//Doing mathemathical operations
var calculateSubtotal = productsList => {
    var subtotal = 0;
    
    for (var product of productsList) {
        subtotal += product.units * product.price
    }

    return subtotal;
}

var calculateTaxes = productsList => {
    var taxes = 0;
    var productTotalPrice = 0;
    var paidTaxes = 0;

    for (var product of productsList) {
        taxes = whichTax(product);
        productTotalPrice = product.units * product.price;
        paidTaxes += productTotalPrice * taxes / 100;
    }

    return paidTaxes;
}

var calculateTotal = productsList => {
    var total = 0; 

    total = calculateSubtotal(productsList) + calculateTaxes(productsList);

    return total;
}

//Disabling the button
var isEmpty = productsList => {
    var isDisabled = true;

    for (var product of productsList) {
        if (product.units > 0) {
            isDisabled = false;
        }
    }

    document.getElementById("calculate-btn").disabled = isDisabled;
}

isEmpty(products);

//Showing the results
var showCalculate = productsList => {
    document.getElementById("subtotal").innerText = "Subtotal: " + calculateSubtotal(productsList);
    document.getElementById("taxes").innerText = "IVA: " + calculateTaxes(productsList);
    document.getElementById("total").innerText = "Total: " + calculateTotal(productsList);
}

//Do calculate
document.getElementById("calculate-btn").addEventListener("click", () => showCalculate(products))