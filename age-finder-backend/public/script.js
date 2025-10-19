async function calculateAge() {
  const name = document.getElementById('name').value.trim();
  const dob = document.getElementById('dob').value;
  const result = document.getElementById('result');

  if (!name || !dob) {
    result.textContent = "⚠️ Please enter your name and date of birth!";
    return;
  }

  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();

  const monthDiff = today.getMonth() - dobDate.getMonth();
  const dayDiff = today.getDate() - dobDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;

  result.textContent = `🎉 ${name}, you are ${age} years old!`;

  // Save to database
  await fetch('/api/addUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, dob, age })
  });

  showUsers();
}

async function showUsers() {
  const response = await fetch('/api/users');
  const users = await response.json();

  const table = document.getElementById('userTable');
  table.innerHTML = `
    <tr><th>ID</th><th>Name</th><th>DOB</th><th>Age</th></tr>
    ${users.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.dob}</td>
        <td>${u.age}</td>
      </tr>
    `).join('')}
  `;
}
