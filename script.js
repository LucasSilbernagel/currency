// Namespace
const currencyExchange = {};

const host = `api.frankfurter.app`;

// Get currency list from API and display dropdowns
currencyExchange.getCurrencies = function () {
    fetch(`https://${host}/currencies`)
    .then(resp => resp.json())
        .then((data) => {
            const currencyText = Object.values(data);
            const currencyKeys = Object.keys(data);

    // Display currencies in dropdown menus
    for (i = 0; i < currencyKeys.length; i++ ) {
        $("#baseCurrency").append(`<option value="${currencyKeys[i]}">${currencyText[i]}</option>`)
        }  
    for (i = 0; i < currencyKeys.length; i++ ) {
        $("#targetCurrency").append(`<option value="${currencyKeys[i]}">${currencyText[i]}</option>`)
        }     
    });
}

// Currency conversion based on user input
currencyExchange.calculateCurrency = function () {
    const baseCurrency = $(`#baseCurrency`).val();
    const amount = $(`#number`).val();
    const targetCurrency = $(`#targetCurrency`).val();
    fetch(`https://${host}/latest?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`)
    .then(resp => resp.json())
    .then((data) => {
    const nestedTargetCurrency = Object.values(data.rates);
    const targetCurrencyKey = nestedTargetCurrency[0];

    // Display currency conversion on the page
    $(".calculationResult").text(`${amount} ${baseCurrency} = ${targetCurrencyKey} ${targetCurrency}`);
    });
    if (baseCurrency === targetCurrency) {
        $(".calculationResult").text(`${amount} ${baseCurrency} = ${amount} ${targetCurrency}`);
    }
}

currencyExchange.runCalculation = function () {
    // Prevent default bahaviour (page reload)
    $(`form`).on(`submit`, function(e) {
        e.preventDefault(); 
        currencyExchange.calculateCurrency();
    });
}

// Maintain viewport sizing when virtual keyboard pops up in mobile
currencyExchange.mobileForm = function () {
    setTimeout(function () {
        let viewheight = $(window).height();
        let viewwidth = $(window).width();
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
    }, 300);
}

currencyExchange.init = function () {
    currencyExchange.getCurrencies();
    currencyExchange.runCalculation();
    currencyExchange.mobileForm();
}

// Document ready
$(function() {
    currencyExchange.init();
});