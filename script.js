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

  // Step 1: Adjust Income for Inflation
  const yearsToRetirement = retirementAge - currentAge;
  const adjustedIncome = desiredIncome * Math.pow(1 + inflationRate, yearsToRetirement);

  // Step 2: Calculate Total Retirement Savings Needed
  const savingsNeeded = adjustedIncome * ((1 - Math.pow(1 + annualReturn, -retirementYears)) / annualReturn);

  // Step 3: Subtract Social Security Income
  const adjustedSavingsNeeded = savingsNeeded - (socialSecurity * ((1 - Math.pow(1 + annualReturn, -retirementYears)) / annualReturn));

  // Step 4: Subtract Current Savings
  const totalSavingsNeeded = adjustedSavingsNeeded - currentSavings;

  // Step 5: Calculate Monthly Savings Needed
  const monthlyRate = annualReturn / 12;
  const totalMonths = yearsToRetirement * 12;
  const monthlySavings = totalSavingsNeeded * (monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1));

  // Display Results
  document.getElementById('incomeNeeded').innerText = `Adjusted Income Needed: $${adjustedIncome.toFixed(2)}`;
  document.getElementById('totalSavingsNeeded').innerText = `Total Savings Needed: $${totalSavingsNeeded.toFixed(2)}`;
  document.getElementById('monthlySavingsRequired').innerText = `Monthly Savings Required: $${monthlySavings.toFixed(2)}`;
});

function calculateRiskReward() {
  // Input values
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
  const potentialProfit = (targetPrice - currentPrice) * (investment / currentPrice);
  const potentialLoss = (currentPrice - stopLossPrice) * (investment / currentPrice);
  const riskToRewardRatio = (targetPrice - currentPrice) / (currentPrice - stopLossPrice);

  // Display results
  document.getElementById("profit").innerText = `Potential Profit: $${potentialProfit.toFixed(2)}`;
  document.getElementById("loss").innerText = `Potential Loss: $${potentialLoss.toFixed(2)}`;
  document.getElementById("ratio").innerText = `Risk-to-Reward Ratio: ${riskToRewardRatio.toFixed(2)}:1`;
}

