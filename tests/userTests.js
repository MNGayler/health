const http = require("http");
const assert = require("assert");

function testGetUsernameEndpoint() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/auth/name",
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
        assert.deepStrictEqual(response, { username: "chartman" });

        console.log("Get Username Endpoint endpoint test passed.");
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

//check for user not found

function testGetUsernameEndpoint2() {
  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/auth/name",
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

        assert.strictEqual(res.statusCode, 200);
        assert.deepStrictEqual(response, { error: "user not found" });

        console.log("Get Username Endpoint 2 endpoint test passed.");
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
  testGetUsernameEndpoint,
  testGetUsernameEndpoint2,
};
