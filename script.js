// Namespace
const currencyExchange = {};

currencyExchange.init = function() {

    // Move cursor into amount field
    $("#number").focus();
    
    // On submit
    // Prevent default bahaviour (page reload)
    $(`form`).on(`submit`, function(e) {
        e.preventDefault();

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
    });
}

$(function() {
    currencyExchange.init();
    });