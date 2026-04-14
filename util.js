const server = "YOUR_LAB4_BACKEND_URL";

function toast(message) {
  M.toast({ html: message });
}

async function sendRequest(url, method, data) {
  try {
    const token = window.localStorage.getItem("access_token");

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    return { error: error.toString() };
  }
}