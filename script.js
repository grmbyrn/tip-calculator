document.addEventListener('DOMContentLoaded', function () {
    const billInput = document.getElementById('bill');
    const peopleInput = document.getElementById('people');
    const perPersonOutput = document.getElementById('per-person');
    const totalOutput = document.getElementById('total');
    const customInput = document.getElementById('custom-input');
    const resetButton = document.getElementById('reset-button');
    const tipButtons = document.querySelectorAll('.tip-button');

    function calculateTip(tipPercentage) {
        const bill = parseFloat(billInput.value);
        const people = parseInt(peopleInput.value);

        if (isNaN(bill) || isNaN(people) || bill <= 0 || people <= 0) {
            resetButton.disabled = true
            return;
        }

        resetButton.disabled = false

        const tipAmount = (bill * (tipPercentage / 100)) / people;
        const totalAmount = (bill / people) + tipAmount;

        perPersonOutput.textContent = `$${tipAmount.toFixed(2)}`;
        totalOutput.textContent = `$${totalAmount.toFixed(2)}`;
    }

    tipButtons.forEach(button => {
        button.addEventListener('click', function () {
            tipButtons.forEach(btn => btn.classList.remove('active'))
            customInput.value = ''
            this.classList.add('active')

            const tipPercentage = parseFloat(this.getAttribute('data-tip'));
            calculateTip(tipPercentage);
        });
    });

    customInput.addEventListener('input', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'))
        const customTipPercentage = parseFloat(customInput.value)
        if (!isNaN(customTipPercentage) && customTipPercentage > 0) {
            calculateTip(customTipPercentage)
        }
    })

    resetButton.addEventListener('click', () => {
        billInput.value = '';
        peopleInput.value = '';
        customInput.value = '';
        perPersonOutput.textContent = '$0.00';
        totalOutput.textContent = '$0.00';
        resetButton.disabled = true
    });
});
