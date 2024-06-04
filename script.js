document.addEventListener('DOMContentLoaded', function () {
    const billInput = document.getElementById('bill');
    const peopleInput = document.getElementById('people');
    const perPersonOutput = document.getElementById('per-person');
    const totalOutput = document.getElementById('total');
    const resetButton = document.getElementById('reset-button');
    const tipButtons = document.querySelectorAll('.tip-button');

    function calculateTip(tipPercentage) {
        const bill = parseFloat(billInput.value);
        const people = parseInt(peopleInput.value);

        if (isNaN(bill) || isNaN(people) || bill <= 0 || people <= 0) {
            return;
        }

        const tipAmount = (bill * (tipPercentage / 100)) / people;
        const totalAmount = (bill / people) + tipAmount;

        perPersonOutput.textContent = tipAmount.toFixed(2);
        totalOutput.textContent = totalAmount.toFixed(2);
    }

    tipButtons.forEach(button => {
        button.addEventListener('click', function () {
            tipButtons.forEach(btn => btn.classList.remove('active'))
            this.classList.add('active')

            const tipPercentage = parseFloat(this.getAttribute('data-tip'));
            calculateTip(tipPercentage);
        });
    });

    resetButton.addEventListener('click', function () {
        billInput.value = '';
        peopleInput.value = '';
        perPersonOutput.textContent = '0.00';
        totalOutput.textContent = '0.00';
    });
});
