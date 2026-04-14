async function signup(event) {
  event.preventDefault();

  const form = event.target;
  const fields = event.target.elements;

  const data = {
    username: fields["username"].value,
    email: fields["email"].value,
    password: fields["password"].value
  };

  form.reset();

  const result = await sendRequest(`${server}/signup`, "POST", data);

  if ("detail" in result || "error" in result) {
    toast(`Register Failed: ${result.detail || result.error}`);
  } else {
    toast("Register Successful");
    window.location.href = "index.html";
  }
}

document.forms["signUpForm"].addEventListener("submit", signup);