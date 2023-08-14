const http = require("http");
const assert = require("assert");

// this item exists
function testGetGlobalFoodItemById() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/globalfooditems/byId/4",
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
        assert.strictEqual(response.id, 4);
        assert.strictEqual(response.food_name, "Watermelon");
        assert.strictEqual(response.energy, 33);
        assert.strictEqual(response.protien, 0.5);
        assert.strictEqual(response.fibre, 0.1);
        assert.strictEqual(response.image, "watermelon");

        console.log("Existing item - Get Global Food Item by ID test passed.");
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
function testGetGlobalFoodItemById2() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/globalfooditems/byId/3",
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

        console.log(
          "Non-existing item -Get Global Food Item by ID test passed."
        );
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
  testGetGlobalFoodItemById,
  testGetGlobalFoodItemById2,
};
