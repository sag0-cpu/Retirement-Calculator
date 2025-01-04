document.getElementById('calculator-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Inputs
  const currentAge = parseFloat(document.getElementById('currentAge').value);
  const retirementAge = parseFloat(document.getElementById('retirementAge').value);
  const desiredIncome = parseFloat(document.getElementById('desiredIncome').value);
  const retirementYears = parseFloat(document.getElementById('retirementYears').value);
  const annualReturn = parseFloat(document.getElementById('annualReturn').value) / 100;
  const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
  const currentSavings = parseFloat(document.getElementById('currentSavings').value);
  const socialSecurity = parseFloat(document.getElementById('socialSecurity').value);

  // Validation
  if (retirementAge <= currentAge) {
    alert("Retirement age must be greater than current age.");
    return;
  }

  // Adjusted Income
  const yearsToRetirement = retirementAge - currentAge;
  const adjustedIncome = desiredIncome * Math.pow(1 + inflationRate, yearsToRetirement);

  // Total Savings Needed
  const savingsNeeded = adjustedIncome * ((1 - Math.pow(1 + annualReturn, -retirementYears)) / annualReturn);
  const adjustedSavingsNeeded = savingsNeeded - (socialSecurity * ((1 - Math.pow(1 + annualReturn, -retirementYears)) / annualReturn));
  const totalSavingsNeeded = adjustedSavingsNeeded - currentSavings;

  // Monthly Savings Calculation
  const monthlyRate = annualReturn / 12;
  const totalMonths = yearsToRetirement * 12;
  let monthlySavings = totalSavingsNeeded * (monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1));

  // Handle No Additional Savings Required
  if (totalSavingsNeeded <= 0) {
    monthlySavings = 0;
  }

  // Display Results
  document.getElementById('retirementIncomeNeeded').innerText = `Adjusted Income Needed: $${adjustedIncome.toFixed(2)}`;
  document.getElementById('retirementTotalSavings').innerText = `Total Savings Needed: $${totalSavingsNeeded.toFixed(2)}`;
  document.getElementById('retirementMonthlySavings').innerText = `Monthly Savings Required: $${monthlySavings.toFixed(2)}`;
});


function calculateRiskReward() {
  const investment = parseFloat(document.getElementById("investment").value);
  const currentPrice = parseFloat(document.getElementById("currentPrice").value);
  const targetPrice = parseFloat(document.getElementById("targetPrice").value);
  const stopLossPrice = parseFloat(document.getElementById("stopLossPrice").value);

  // Error handling
  if (
    isNaN(investment) ||
    isNaN(currentPrice) ||
    isNaN(targetPrice) ||
    isNaN(stopLossPrice) ||
    currentPrice <= stopLossPrice ||
    targetPrice <= currentPrice
  ) {
    alert("Please enter valid values for prices and ensure target > current > stop-loss.");
    return;
  }

  // Calculations
  const profit = (targetPrice - currentPrice) * (investment / currentPrice);
  const loss = (currentPrice - stopLossPrice) * (investment / currentPrice);
  const ratio = (targetPrice - currentPrice) / (currentPrice - stopLossPrice);

  // Display results
  document.getElementById("riskProfit").innerText = `Potential Profit: $${profit.toFixed(2)}`;
  document.getElementById("riskLoss").innerText = `Potential Loss: $${loss.toFixed(2)}`;
  document.getElementById("riskRatio").innerText = `Risk-to-Reward Ratio: ${ratio.toFixed(2)}:1`;
}
