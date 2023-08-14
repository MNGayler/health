const http = require("http");
const assert = require("assert");

// // Test CHART API water end point for user's returning 7 and 0 items and invalid user
/**
 * @api {get} /charts/water Test Water Endpoint - Case 1
 * @apiName TestWaterEndpoint
 * @apiGroup chartTest
 *
 * @apiDescription This test sends a GET request to the /charts/water endpoint to test its functionality.
 * It checks whether the endpoint returns the correct number of entries for a valid user.
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * ...
 */
async function testWaterEndpoint() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/charts/water",
    method: "GET",
    headers: {
      userId: 22,
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        assert.strictEqual(res.statusCode, 200);
        assert.ok(Array.isArray(response));
        assert.strictEqual(response.length, 7, "Expected 7 entries.");

        console.log("Water endpoint test passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
}
async function testWaterEndpoint2() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/charts/water",
    method: "GET",
    headers: {
      userId: 41,
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        assert.strictEqual(res.statusCode, 200);
        assert.ok(Array.isArray(response));
        assert.strictEqual(response.length, 0, "Expected 0 entries.");

        console.log("Water endpoint test 2 passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
}

// Test water with an invalid user ID (non-existent user)

async function testWaterEndpointWithInvalidUser() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/charts/water",
    method: "GET",
    headers: {
      userId: 1000,
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        // Check that the status code is 200 and the response is an empty array
        assert.strictEqual(res.statusCode, 200);
        assert.deepStrictEqual(response, []);

        console.log("water endpoint test with invalid user passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
}

// // Test CHART API weight end point for user returning 7 and 0 items and invalid user

// return 7 records
async function testWeightEndpoint() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/charts/weight",
    method: "GET",
    headers: {
      userId: 22,
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        assert.strictEqual(res.statusCode, 200);
        assert.ok(Array.isArray(response));
        assert.strictEqual(response.length, 7, "Expected 7 entries.");

        console.log("Weight endpoint test passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
}
// weight 2 - user with no records
async function testWeightEndpoint2() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/charts/weight",
    method: "GET",
    headers: {
      userId: 41,
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        assert.strictEqual(res.statusCode, 200);
        assert.ok(Array.isArray(response));
        assert.strictEqual(response.length, 0, "Expected 0 entries.");

        console.log("Weight endpoint test 2 passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
}

async function testWeightEndpointWithInvalidUser() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/charts/weight",
    method: "GET",
    headers: {
      userId: 1000,
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        // Check that the status code is 200 and the response is an empty array
        assert.strictEqual(res.statusCode, 200);
        assert.deepStrictEqual(response, []);

        console.log("weight endpoint test with invalid user passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
}

// // Test CHART API nutrient end point for user returning 7 and 0 items and invalid user

// return 7 records
async function testNutrientEndpoint() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/charts/nutrients",
    method: "GET",
    headers: {
      userId: 22,
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        assert.strictEqual(res.statusCode, 200);
        assert.ok(Array.isArray(response));
        assert.strictEqual(response.length, 7, "Expected 7 entries.");

        console.log("Nutrient test passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
}
// nutrient test 2 for user with no items
async function testNutrientEndpoint2() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/charts/nutrients",
    method: "GET",
    headers: {
      userId: 41,
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        assert.strictEqual(res.statusCode, 200);
        assert.ok(Array.isArray(response));
        assert.strictEqual(response.length, 0, "Expected 0 entries.");

        console.log("Nutrient test 2 passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
}

async function testNutrientEndpointWithInvalidUser() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/charts/nutrients",
    method: "GET",
    headers: {
      userId: 1000, // Invalid user ID
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const response = JSON.parse(data);

        // check that the status code is 200 and the response is an empty array
        assert.strictEqual(res.statusCode, 200);
        assert.deepStrictEqual(response, []);

        console.log("Nutrient endpoint test with invalid user passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
}

// testWaterEndpoint();
// testWaterEndpoint2();
// testWaterEndpointWithInvalidUser();
// testWeightEndpoint();
// testWeightEndpoint2();
// testWeightEndpointWithInvalidUser();
// testNutrientEndpoint();
// testNutrientEndpoint2();
// testNutrientEndpointWithInvalidUser();
// Export all the test functions
module.exports = {
  testWaterEndpoint,
  testWaterEndpoint2,
  testWaterEndpointWithInvalidUser,
  testWeightEndpoint,
  testWeightEndpoint2,
  testWeightEndpointWithInvalidUser,
  testNutrientEndpoint,
  testNutrientEndpoint2,
  testNutrientEndpointWithInvalidUser
};