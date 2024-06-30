async function getAccessToken() {
    const response = await fetch(
        'https://openapisandbox.investec.com/identity/v2/oauth2/token', {
            method: 'POST',
            headers: {
                "Authorization": "Basic " + Buffer.from(process.env.clientId + ':' + process.env.secret).toString('base64'),
                "x-api-key": process.env.apikey,
                "content-type": "application/x-www-form-urlencoded"
            },
            body: 'grant_type=client_credentials'
        });
    // console.log(response.status);
    return (await response.json()).access_token;
  };
  
  async function getAccounts(token) {
    const response = await fetch(
        `https://openapisandbox.investec.com/za/pb/v1/accounts`, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    // console.log(response.status);
    return (await response.json());
  };
  
  async function doTransfer(token) {
    const response = await fetch(
        `https://openapisandbox.investec.com/za/pb/v1/accounts/${process.env.fromAccountId}/transfermultiple`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "transferList": [{
                    "beneficiaryAccountId": process.env.toAccountId,
                    "amount": investAmount,
                    "myReference": "Emissions Investment",
                    "theirReference": "Petrol Emission Compensation"
                }],
                "profileId": process.env.profileId
            })
        });
    // console.log(response.status);
    return (await response.json());
  };

// Price of fuel per liter. Update this on the 1st Wednesday of each month or add API. 
const fuelPrice = 2470;

// Emissions in kg per liter of Petrol 95. Ajust depending on fuel type. 
const emissionsPerLiter = 2.3;

  // We assume a price per tone of CO2 to be 100USD or approxamitaly 1900ZAR
  const pricePerKg = 1.9;

function calculateCarbonFootprint(centsAmount, fuelPrice, emissionsPerLiter) {
  const totalLiters = centsAmount / fuelPrice;
  const emissions = totalLiters * emissionsPerLiter;
  return emissions;
}

function calculateInvestment(emissions, pricePerKg) {
    const investAmount = emissions * pricePerKg;
    return investAmount;
  }

const beforeTransaction = async (authorization) => {
  console.log(authorization);
};

const afterTransaction = async (transaction) => {
  console.log(transaction);
  if (process.env.fuelCodes.some(code => code === transaction.merchant.category.code)) {
    const carbonFootprint = calculateCarbonFootprint(transaction.centsAmount, fuelPrice, emissionsPerLiter);
    console.log(`Your carbon footprint is ${carbonFootprint.toFixed(2)} kg of CO2.`);
    console.log(`You transferred ${calculateInvestment(carbonFootprint, pricePerKg).toFixed(2)}ZAR to invest in ClimaTech.`);
  }
};

const afterDecline = async (transaction) => {
  console.log(transaction);
};

const afterReversal = async (transaction) => { 
    console.log(transaction);
};
  
  const afterAdjustment = async (transaction) => { 
    console.log(transaction);
};