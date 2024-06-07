document.addEventListener("DOMContentLoaded", function() {
    const numberElement = document.getElementById('coinbalance');

    function formatNumber(number) {
        if (number >= 1000) {
            const formattedNumber = number / 1000;
            return formattedNumber.toFixed(1) + 'k';
        }
        return number;
    }

    function updateNumber() {
        const number = parseInt(numberElement.textContent);
        const formatted = formatNumber(number);
        numberElement.textContent = formatted;
    }

    updateNumber();
});