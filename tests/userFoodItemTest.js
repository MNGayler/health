const http = require("http");
const assert = require("assert");

// this item exists
function testGetUserFoodItemById() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/userfooditems/byId/3",
    method: "GET",
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
        assert.strictEqual(response.id, 3);
        assert.strictEqual(response.user, 1);
        assert.strictEqual(response.food_name, "potato");
        assert.strictEqual(response.energy, 10);
        assert.strictEqual(response.protien, 0.5);
        assert.strictEqual(response.fibre, 1.1);
        assert.strictEqual(response.image, "onion");

        console.log("Existing item - Get User Food Item by ID test passed.");
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

// No item at this id
function testGetUserFoodItemById2() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/userfooditems/byId/2",
    method: "GET",
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
        assert.strictEqual(response, null);

        console.log("Non-existing item -Get User Food Item by ID test passed.");
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

module.exports = {
  testGetUserFoodItemById,
  testGetUserFoodItemById2,
};
