const http = require("http");
const assert = require("assert");

function testWaterConsumptionEndpoint() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/water",
    method: "GET",
    headers: {
      userId: 7700,
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
        assert.deepStrictEqual(response, { todaysIntake: 0 });

        console.log("Water consumption endpoint test passed.");
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
  testWaterConsumptionEndpoint,
};
