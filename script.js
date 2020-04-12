// Namespace
const currencyExchange = {};

currencyExchange.calculateCurrency = function () {
    // Get currency convert calculation from Frankfurter API
    const host = `api.frankfurter.app`;
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

currencyExchange.preventDefault = function () {
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
    currencyExchange.preventDefault();
    currencyExchange.calculateCurrency();
    currencyExchange.mobileForm();
}

// Document ready
$(function() {
    currencyExchange.init();
});