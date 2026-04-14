M.Tabs.init(document.querySelector(".tabs"));

async function displayTodos(data) {
  const result = document.querySelector("#result");
  result.innerHTML = "";

  let html = "";

  if ("error" in data || "detail" in data) {
    html += `
      <li class="card collection-item col s12 m4">
        <div class="card-content">
          <span class="card-title">
            Error : Not Logged In
          </span>
        </div>
      </li>
    `;
  } else {
    for (const todo of data) {
      html += `
        <li class="card collection-item col s12 m4">
          <div class="card-content">
            <span class="card-title">${todo.text}
              <label class="right">
                <input type="checkbox" data-id="${todo.id}" onclick="toggleDone(event)" ${todo.done ? "checked" : ""} />
                <span>Done</span>
              </label>
            </span>
          </div>
          <div class="card-action">
            <a href="#" onclick="deleteTodo('${todo.id}')">DELETE</a>
          </div>
        </li>
      `;
    }
  }

  result.innerHTML = html;
}

async function loadView() {
  const todos = await sendRequest(`${server}/todos`, "GET");
  displayTodos(todos);
}

async function createTodo(event) {
  event.preventDefault();

  const form = event.target.elements;

  const data = {
    text: form["addText"].value,
    done: false
  };

  event.target.reset();

  const result = await sendRequest(`${server}/todos`, "POST", data);

  if ("error" in result || "detail" in result) {
    toast("Error: Not Logged In");
  } else {
    toast("Todo Created!");
  }

  loadView();
}

async function toggleDone(event) {
  const checkbox = event.target;
  const id = checkbox.dataset["id"];

  const result = await sendRequest(`${server}/todos/${id}/done`, "PUT");

  if ("error" in result || "detail" in result) {
    toast("Update Failed");
    loadView();
    return;
  }

  toast(result.message || (checkbox.checked ? "Done!" : "Not Done!"));
}

async function deleteTodo(id) {
  const result = await sendRequest(`${server}/todos/${id}`, "DELETE");

  if ("error" in result || "detail" in result) {
    toast("Delete Failed");
  } else {
    toast("Deleted!");
  }

  loadView();
}

function logout() {
  window.localStorage.removeItem("access_token");
  window.location.href = "index.html";
}

document.forms["addForm"].addEventListener("submit", createTodo);

loadView();