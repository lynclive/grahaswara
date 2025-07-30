let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

// Initialize display
display.value = '0';

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        // Prevent multiple decimal points
        if (value === '.' && display.value.includes('.')) {
            return;
        }
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '0';
    currentInput = '';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
}

function clearEntry() {
    display.value = '0';
    shouldResetDisplay = false;
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculate() {
    try {
        let expression = display.value;
        
        // Replace × with * for evaluation
        expression = expression.replace(/×/g, '*');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            display.value = 'Error';
            shouldResetDisplay = true;
            return;
        }
        
        // Format the result
        if (result.toString().length > 12) {
            result = parseFloat(result.toFixed(10));
        }
        
        display.value = result.toString();
        shouldResetDisplay = true;
        
    } catch (error) {
        display.value = 'Error';
        shouldResetDisplay = true;
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and decimal point
    if (/[0-9.]/.test(key)) {
        appendToDisplay(key);
    }
    
    // Operators
    switch(key) {
        case '+':
            appendToDisplay('+');
            break;
        case '-':
            appendToDisplay('-');
            break;
        case '*':
            appendToDisplay('*');
            break;
        case '/':
            event.preventDefault(); // Prevent browser search
            appendToDisplay('/');
            break;
        case 'Enter':
        case '=':
            event.preventDefault();
            calculate();
            break;
        case 'Escape':
        case 'c':
        case 'C':
            clearDisplay();
            break;
        case 'Backspace':
            event.preventDefault();
            deleteLast();
            break;
    }
});

// Prevent invalid characters from being typed
display.addEventListener('input', function(event) {
    let value = event.target.value;
    
    // Remove any characters that aren't numbers, operators, or decimal points
    value = value.replace(/[^0-9+\-*/.]/g, '');
    
    // Update display
    event.target.value = value;
});

// Add visual feedback for button presses
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(2px)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});