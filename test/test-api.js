const BASE_URL = "http://localhost:3000/api/products";

async function runTest() {
  const pid = "TEST" + Date.now();

  try {
    // 1. Health Check
    let response = await fetch("http://localhost:3000/health");

    if (!response.ok) {
      throw new Error("Health check failed");
    }

    console.log("✓ Health check passed");

    // 2. CREATE
    response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pid: pid,
        pname: "CI Test Product",
        price: 100000,
        quantity: 5
      })
    });

    if (!response.ok) {
      throw new Error("CREATE Product failed");
    }

    console.log("✓ CREATE Product passed");

    // 3. READ
    response = await fetch(`${BASE_URL}/${pid}`);

    if (!response.ok) {
      throw new Error("READ Product failed");
    }

    console.log("✓ READ Product passed");

    // 4. UPDATE
    response = await fetch(`${BASE_URL}/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pname: "CI Test Product Updated",
        price: 120000,
        quantity: 10
      })
    });

    if (!response.ok) {
      throw new Error("UPDATE Product failed");
    }

    console.log("✓ UPDATE Product passed");

    // 5. DELETE
    // 5. GET ALL



    response = await fetch(`${BASE_URL}/${pid}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("DELETE Product failed");
    }

    console.log("✓ DELETE Product passed");

    console.log("===========================");
    console.log("✓ ALL TESTS PASSED");
    console.log("===========================");

  } catch (error) {
    console.error("✗ TEST FAILED:", error.message);

    // Báo cho CI biết test thất bại,
    // nhưng không ép Node tắt ngay lập tức
    process.exitCode = 1;
  }
}

runTest();