async function login(event) {
  event.preventDefault();

  const form = event.target;
  const fields = form.elements;

  const data = {
    username: fields["username"].value,
    password: fields["password"].value
  };

  form.reset();

  const result = await sendRequest(`${server}/login`, "POST", data);

  if ("detail" in result || "error" in result) {
    toast(`Login Failed: ${result.detail || result.error}`);
  } else {
    toast("Login Successful");
    window.localStorage.setItem("access_token", result.access_token);
    window.location.href = "app.html";
  }
}

document.forms["loginForm"].addEventListener("submit", login);