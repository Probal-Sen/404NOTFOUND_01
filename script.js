document.addEventListener('DOMContentLoaded', function () {
    // Get references to the elements
    const incomeInput = document.getElementById('income');
    const expenseInput = document.getElementById('expense');
    const calculateBtn = document.getElementById('calculate-btn');
    const balanceDisplay = document.getElementById('balance');
  
    // Setup chart.js contexts
    const lineChartCtx = document.getElementById('income-expenses-line-chart').getContext('2d');
    const barChartCtx = document.getElementById('income-expenses-stacked-bar-chart').getContext('2d');
    const polarChartCtx = document.getElementById('income-expenses-polar-chart').getContext('2d');
  
    // Data arrays for the graphs (for dynamic updating)
    let incomeData = [];
    let expenseData = [];
    let balanceData = [];
  
    // Create Chart.js charts
    const lineChart = new Chart(lineChartCtx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Income',
          data: [],
          borderColor: 'green',
          backgroundColor: 'rgba(0,255,0,0.3)',
          fill: true,
        }, {
          label: 'Expense',
          data: [],
          borderColor: 'red',
          backgroundColor: 'rgba(255,0,0,0.3)',
          fill: true,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Time' }},
          y: { title: { display: true, text: 'Amount ($)' }}
        }
      }
    });
  
    const barChart = new Chart(barChartCtx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Income',
            data: [],
            backgroundColor: 'green',
          },
          {
            label: 'Expense',
            data: [],
            backgroundColor: 'red',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Time' }},
          y: { title: { display: true, text: 'Amount ($)' }}
        }
      }
    });
  
    const polarChart = new Chart(polarChartCtx, {
      type: 'polarArea',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{
          data: [0, 0],
          backgroundColor: ['green', 'red'],
        }]
      },
      options: {
        responsive: true
      }
    });
  
    // Handle the "Calculate Balance" button click
    calculateBtn.addEventListener('click', function () {
      // Get the values of income and expense
      const income = parseFloat(incomeInput.value) || 0;
      const expense = parseFloat(expenseInput.value) || 0;
  
      // Calculate the balance
      const result = income-expense;
      if(result>0){
        balance=result
      }
      else balance=0;
      // Update the balance display
      balanceDisplay.textContent = balance.toFixed(2);
  
      // Update graph data dynamically
      updateGraphs(income, expense, balance);
    });
  
    // Function to update graphs with new data
    function updateGraphs(income, expense, balance) {
      // Time as a label (for simplicity, just using the count of data entries)
      const timeLabel = `Month ${incomeData.length + 1}`;
  
      // Add new data to the arrays
      incomeData.push(income);
      expenseData.push(expense);
      balanceData.push(balance);
  
      // Update the line chart
      lineChart.data.labels.push(timeLabel);
      lineChart.data.datasets[0].data.push(income);
      lineChart.data.datasets[1].data.push(expense);
      lineChart.update();
  
      // Update the bar chart
      barChart.data.labels.push(timeLabel);
      barChart.data.datasets[0].data.push(income);
      barChart.data.datasets[1].data.push(expense);
      barChart.update();
  
      // Update the polar chart
      polarChart.data.datasets[0].data = [incomeData.reduce((a, b) => a + b, 0), expenseData.reduce((a, b) => a + b, 0)];
      polarChart.update();
    }
  });
  