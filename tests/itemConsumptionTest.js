const http = require("http");
const assert = require("assert");

function testGetAllConsumptionsEndpoint() {
  const options = {
    hostname: "localhost",
    port: 6001, 
    path: "/itemConsumption", 
    method: "GET",
    headers: {
      userId: "8", 
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
        assert.ok(Array.isArray(response)); 
        assert.ok(response.length, 4); 

        // Check a the first record returned
        assert.strictEqual(response[0].user, 8); 
        assert.strictEqual(response[0].type, "global");

        console.log("Get all consumptions endpoint test passed.");
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

function testGetAllConsumptionsEndpoint2() {
    const options = {
      hostname: "localhost",
      port: 6001, 
      path: "/itemConsumption", 
      method: "GET",
      headers: {
        userId: "1000", 
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
          assert.ok(Array.isArray(response)); 

          assert.strictEqual(response.length, 0);
  
           
          console.log("Get all consumptions 2 endpoint test passed.");
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





// Run the test
module.exports = {
testGetAllConsumptionsEndpoint,
testGetAllConsumptionsEndpoint2}