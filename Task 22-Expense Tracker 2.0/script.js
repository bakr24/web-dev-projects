const transactionForm = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const balanceElement = document.getElementById("balance");
const totalIncomeElement = document.getElementById("totalIncome");
const totalExpensesElement = document.getElementById("totalExpenses");
const transactionsContainer = document.getElementById("transactionsContainer");
const transactionCount = document.getElementById("transactionCount");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const categoryFilter = document.getElementById("categoryFilter");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

dateInput.value = new Date().toISOString().split("T")[0];

function saveTransactions() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function generateId() {
    return Date.now().toString();
}

function addTransaction(event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;

    if (!description || amount <= 0 || !date) {
        return;
    }

    const transaction = {
        id: generateId(),
        description: description,
        amount: amount,
        type: type,
        category: category,
        date: date
    };

    transactions.unshift(transaction);

    saveTransactions();

    transactionForm.reset();

    dateInput.value = new Date().toISOString().split("T")[0];

    updateSummary();

    renderTransactions();

    descriptionInput.focus();
}

function calculateTotals() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpenses;

    return {
        totalIncome,
        totalExpenses,
        balance
    };
}

function updateSummary() {
    const totals = calculateTotals();

    balanceElement.textContent = formatCurrency(totals.balance);
    totalIncomeElement.textContent = formatCurrency(totals.totalIncome);
    totalExpensesElement.textContent = formatCurrency(totals.totalExpenses);
}

function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

transactionForm.addEventListener("submit", addTransaction);

function renderTransactions(data = transactions) {
    transactionsContainer.innerHTML = "";

    if (data.length === 0) {
        emptyState.style.display = "block";
        transactionCount.textContent = "0 transactions";
        return;
    }

    emptyState.style.display = "none";

    transactionCount.textContent =
        `${data.length} ${data.length === 1 ? "transaction" : "transactions"}`;

    data.forEach(transaction => {
        const transactionElement = document.createElement("div");

        transactionElement.className =
            `transaction ${transaction.type}`;

        const icon =
            transaction.type === "income"
                ? "fa-arrow-trend-up"
                : "fa-arrow-trend-down";

        const sign =
            transaction.type === "income"
                ? "+"
                : "-";

        const formattedDate =
            formatDate(transaction.date);

        transactionElement.innerHTML = `
            <div class="transaction-icon">
                <i class="fa-solid ${icon}"></i>
            </div>

            <div class="transaction-info">
                <h3>${transaction.description}</h3>
                <p>${formattedDate}</p>
            </div>

            <span class="transaction-category">
                ${transaction.category}
            </span>

            <span class="transaction-date">
                ${formattedDate}
            </span>

            <span class="transaction-amount">
                ${sign}${formatCurrency(transaction.amount)}
            </span>

            <button
                class="delete-btn"
                onclick="deleteTransaction('${transaction.id}')">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;

        transactionsContainer.appendChild(transactionElement);
    });
}

function formatDate(date) {
    const dateObject = new Date(`${date}T00:00:00`);

    return dateObject.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}

function deleteTransaction(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
        return;
    }

    transactions = transactions.filter(transaction => {
        return transaction.id !== id;
    });

    saveTransactions();

    updateSummary();

    renderTransactions();
}

function filterTransactions() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;
    const selectedCategory = categoryFilter.value;

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch =
            transaction.description
                .toLowerCase()
                .includes(searchValue);

        const matchesType =
            selectedType === "all" ||
            transaction.type === selectedType;

        const matchesCategory =
            selectedCategory === "all" ||
            transaction.category === selectedCategory;

        return (
            matchesSearch &&
            matchesType &&
            matchesCategory
        );
    });

    renderTransactions(filteredTransactions);
}

searchInput.addEventListener("input", () => {
    filterTransactions();
});

typeFilter.addEventListener("change", () => {
    filterTransactions();
});

categoryFilter.addEventListener("change", () => {
    filterTransactions();
});

function initializeApp() {
    updateSummary();
    renderTransactions();
}

window.addEventListener("load", () => {
    initializeApp();
});