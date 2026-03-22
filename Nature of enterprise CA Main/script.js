function login() {
  const username = document.getElementById('username').value;
  if(username) {
    document.getElementById('user-name').textContent = username;
    alert('Logged in as ' + username);
  } else {
    alert('Please enter a username');
  }
}

function changeName() {
  const newName = prompt('Enter new name:');
  if(newName) {
    document.getElementById('user-name').textContent = newName;
  }
}