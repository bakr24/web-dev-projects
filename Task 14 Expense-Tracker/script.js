const expenseForm = document.querySelector(".expense-form");

const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const totalAmount = document.getElementById("totalAmount");
const expenseList = document.getElementById("expenseList");

const filterCategory = document.getElementById("filterCategory");
const sortBy = document.getElementById("sortBy");

const emptyMessage = document.getElementById("emptyMessage");


let expenses = [];

function displayExpenses() {

    expenseList.innerHTML = "";

    if(expenses.length === 0){
       emptymessage.style.display= "block";
    }
    else{
        emptymessage.style.display = "none";
    }

    expenses.forEach(function (expense,index) {

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="expense-info">
                <strong>${expense.description}</strong>
                <span class="expense-category">${expense.category}</span>
                <span class="expense-amount">${expense.amount}/-pkr</span>
                <small>${expense.timestamp.toLocaleString()}</small>
            </div>
            <div class="actions">
                <button class="delete-btn">Delete</button>
            </div>
        `;

        expenseList.appendChild(li);

        const deleteButton = li.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            expenses.splice(index, 1);
            displayExpenses();
            updateTotal();
            saveExpenses();
        });
    });
}

expenseForm.addEventListener("submit", function(event){
    event.preventDefault();

    const amount = Number(amountInput.value);
    const description = descriptionInput.value.trim();
    const category = categoryInput.value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    if (description === "") {
        alert("Description is required.");
        return;
    }
    if (category === "") {
        alert("Please select a category.");
        return;
    }

    const expense = {
        amount: amount,
        description: description,
        category: category,
        timestamp: new Date()
    };

    expenses.push(expense);
        displayExpenses();
        updateTotal();
        saveExpenses();

amountInput.value = "";
descriptionInput.value = "";
categoryInput.value = "";

        console.log(expenses);
    
});


function updateTotal(){
    let total = 0;

    expenses.forEach(function(expense){
        total += expense.amount;
    });
    totalAmount.textContent = `${total.toFixed(2)}`;
}

function saveExpenses(){
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function loadExpenses() {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
        expenses.forEach(function(expense){
            expense.timestamp=new Date(expense.timestamp);
        });

        displayExpenses();
        updateTotal();
    }
}

loadExpenses();