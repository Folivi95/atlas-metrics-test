# atlas-metrics-test
Atlas Metrics Test implementation

# How to run Project
* Clone the project using git clone "project-url".
* Run "npm install" on project terminal.
* Run "npm run start" on project terminal
* Download postman application.


## Create Emission Request.
* Send a POST request to the following endpoint: http://localhost:3200/api/v1/emissions
* Request body should be in the format below.
* {
    "productId": "1",
    "emission": 0.0,
    "recordedAt": "dd/mm/yyyy"
}


## Get Emission Stats
* Send a GET request to the endpoint: http://localhost:3200/api/v1/stats/{productId}
* Response will contain Emission stats for the productId.
