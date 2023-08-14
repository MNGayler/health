const chartsTest = require("./chartTest"); 
const waterTests = require("./waterTest");
const consumptionTests = require("./itemConsumptionTest");
const userTests = require("./userTests")
const adminTests = require("./adminTest");
const globalFoodItemTest = require("./globalFoodItemTest")
const userFoodItemsTest =require("./userFoodItemTest")

// Run all test functions
chartsTest.testWaterEndpoint();
chartsTest.testWaterEndpoint2();
chartsTest.testWaterEndpointWithInvalidUser();
chartsTest.testWeightEndpoint();
chartsTest.testWeightEndpoint2();
chartsTest.testWeightEndpointWithInvalidUser();
chartsTest.testNutrientEndpoint();
chartsTest.testNutrientEndpoint2();
chartsTest.testNutrientEndpointWithInvalidUser();
waterTests.testWaterConsumptionEndpoint();
consumptionTests.testGetAllConsumptionsEndpoint();
consumptionTests.testGetAllConsumptionsEndpoint2();
userTests.testGetUsernameEndpoint();
userTests.testGetUsernameEndpoint2();
adminTests.testLoginEndpoint();
adminTests.testLoginEndpoint2();
globalFoodItemTest.testGetGlobalFoodItemById();
globalFoodItemTest.testGetGlobalFoodItemById2();
userFoodItemsTest.testGetUserFoodItemById();
userFoodItemsTest.testGetUserFoodItemById2();