// Add interactivity if required, such as animations for scrolling or hover effects.
// Example: Smooth scrolling to sections
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Adjust for fixed header
          behavior: 'smooth',
        });
      }
    });
  });
  // Elements
const incomeInput = document.getElementById('income');
const expenseInput = document.getElementById('expense');
const calculateBtn = document.getElementById('calculate-btn');
const balanceDisplay = document.getElementById('balance');

// Calculate Remaining Balance
calculateBtn.addEventListener('click', () => {
    const income = parseFloat(incomeInput.value) || 0;
    const expense = parseFloat(expenseInput.value) || 0;

    if (income < 0 || expense < 0) {
        alert('Please enter positive values for income and expense.');
        return;
    }

    const balance = income - expense;
    balanceDisplay.textContent = balance.toFixed(2);

    // Change color of balance based on its value
    if (balance >= 0) {
        balanceDisplay.style.color = '#2ecc71';
    } else {
        balanceDisplay.style.color = '#e74c3c';
    }
});
// Initialize an array to store historical data for the graph
let incomeHistory = [];
let expenseHistory = [];
let balanceHistory = [];

// Handle click on "Calculate Balance" button
document.getElementById("calculate-btn").addEventListener("click", function() {
    let income = parseFloat(document.getElementById("income").value) || 0;
    let expense = parseFloat(document.getElementById("expense").value) || 0;
    let balance = income - expense;

    // Update the balance
    document.getElementById("balance").innerText = balance;

    // Store history for the graph
    incomeHistory.push(income);
    expenseHistory.push(expense);
    balanceHistory.push(balance);

    // Update the chart with new data
    updateChart();
});

// Function to update the chart
function updateChart() {
    const ctx = document.getElementById("finance-chart").getContext("2d");
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: incomeHistory.length }, (_, i) => `Entry ${i + 1}`),
            datasets: [
                {
                    label: "Income",
                    data: incomeHistory,
                    borderColor: "green",
                    fill: false
                },
                {
                    label: "Expenses",
                    data: expenseHistory,
                    borderColor: "red",
                    fill: false
                },
                {
                    label: "Balance",
                    data: balanceHistory,
                    borderColor: "blue",
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Entries'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount ($)'
                    }
                }
            }
        }
    });
}
// Create Bar Chart for Income and Expenses
function createBarChart() {
    const ctxBar = document.getElementById("income-expenses-bar-chart").getContext("2d");
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ["Income", "Expenses"],
            datasets: [
                {
                    label: "Current Entry",
                    data: [incomeHistory[incomeHistory.length - 1] || 0, expenseHistory[expenseHistory.length - 1] || 0],
                    backgroundColor: ["green", "red"],
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
            scales: {
                x: { title: { display: true, text: "Categories" } },
                y: { title: { display: true, text: "Amount ($)" } },
            }
        }
    });
}

// Create Doughnut Chart for Income and Expenses Distribution
function createDoughnutChart() {
    const ctxDoughnut = document.getElementById("income-expenses-doughnut-chart").getContext("2d");
    new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ["Income", "Expenses"],
            datasets: [
                {
                    data: [
                        incomeHistory.reduce((acc, val) => acc + val, 0),
                        expenseHistory.reduce((acc, val) => acc + val, 0),
                    ],
                    backgroundColor: ["green", "red"],
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" },
            }
        }
    });
}

// Update all graphs after calculation
function updateAdditionalCharts() {
    // Destroy previous charts to avoid overlapping
    document.getElementById("income-expenses-bar-chart").remove();
    document.getElementById("income-expenses-doughnut-chart").remove();

    const graphsContainer = document.querySelector(".graphs-container");

    // Re-add canvas elements for Bar and Doughnut charts
    graphsContainer.insertAdjacentHTML("beforeend", `
        <canvas id="income-expenses-bar-chart" width="400" height="200"></canvas>
        <canvas id="income-expenses-doughnut-chart" width="400" height="200"></canvas>
    `);

    createBarChart();
    createDoughnutChart();
}

// Update both the line chart and additional charts
function updateAllCharts() {
    updateChart(); // Update line chart
    updateAdditionalCharts(); // Update bar and doughnut charts
}

// Modify the existing "Calculate Balance" button click event
document.getElementById("calculate-btn").addEventListener("click", function () {
    let income = parseFloat(document.getElementById("income").value) || 0;
    let expense = parseFloat(document.getElementById("expense").value) || 0;
    let balance = income - expense;

    // Update the balance
    document.getElementById("balance").innerText = balance;

    // Store history for the graph
    incomeHistory.push(income);
    expenseHistory.push(expense);
    balanceHistory.push(balance);

    // Update all charts
    updateAllCharts();
});

// Initial call to render additional charts
updateAdditionalCharts();
