const http = require("http");
const assert = require("assert");

//wrong password
function testLoginEndpoint() {
  const requestData = JSON.stringify({
    email: "Admin2@gmail.com",
    password: "password12",
  });

  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/authadmin/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": requestData.length,
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

        // Check the response properties and values
        assert.strictEqual(res.statusCode, 200);
        assert.deepStrictEqual(response, { error: "Wrong email or password!" });

        console.log("ADMIN Login with wrong password endpoint test passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  // Send the request data
  req.write(requestData);
  req.end();
}

//wrong username
function testLoginEndpoint2() {
  const requestData = JSON.stringify({
    email: "AAdmin2@gmail.com",
    password: "password123",
  });

  const options = {
    hostname: "localhost",
    port: 6001,
    path: "/authadmin/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": requestData.length,
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

        // Check the response properties and values
        assert.strictEqual(res.statusCode, 200);
        assert.deepStrictEqual(response, { error: "Wrong email or password!" });

        console.log(" ADMIN Login with wrong username endpoint test passed.");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  // Send the request data
  req.write(requestData);
  req.end();
}


module.exports = {
testLoginEndpoint,
testLoginEndpoint2
}