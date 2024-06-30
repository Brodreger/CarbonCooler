# CarbonCooler
This script is designed to track the carbon footprint of fuel purchases and automatically invest in carbon offset initiatives.

# Usage
Set the required environment variables.
Run the script to fetch the access token, fetch the user's accounts, and initiate a transfer.
The script will automatically calculate the carbon footprint and investment amount for fuel purchases and log the results to the console.

# Issues and Limitations
I struggled to get this to work using the client simulator. Please note that some variable such as fuelPrice and amountPerKg have to be updated regularly. Secondly the emissions are calculated on a petrol car. Should one use a Diesel vehicle adjust accordingly (2.7kg). Thirdly the calculation only works, if the total amount spend is for fuel. 

# Thank You  
A massive thanks goes Peter who helped me on a Friday afternoon and got it to work on his online simulator!
Also without his work on https://github.com/petersmythe/investec-swipe-n-save this would have not beeen possible. 