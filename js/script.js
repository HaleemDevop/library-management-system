// Search books
function searchBook() {
  let input = document.getElementById('search').value.toLowerCase();
  let table = document.getElementById('libraryTable');
  let rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName('td');
    let found = false;
    for (let j = 0; j < cells.length - 1; j++) { // ignore action buttons
      if (cells[j].innerText.toLowerCase().includes(input)) {
        found = true;
        break;
      }
    }
    rows[i].style.display = found ? '' : 'none';
  }
}

// Sort table
function sortTable(n) {
  let table = document.getElementById('libraryTable');
  let rows = Array.from(table.rows).slice(1);
  let asc = table.getAttribute('data-sort') === 'asc';

  rows.sort((a, b) => {
    let valA = a.cells[n].innerText.toLowerCase();
    let valB = b.cells[n].innerText.toLowerCase();
    return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  rows.forEach(row => table.appendChild(row));
  table.setAttribute('data-sort', asc ? 'desc' : 'asc');
}

// Add new book
document.getElementById('addBookForm').addEventListener('submit', function(e){
  e.preventDefault();
  let table = document.getElementById('libraryTable').getElementsByTagName('tbody')[0];
  let row = table.insertRow();

  row.innerHTML = `
    <td>${document.getElementById('bookName').value}</td>
    <td>${document.getElementById('author').value}</td>
    <td>${document.getElementById('genre').value}</td>
    <td>${document.getElementById('year').value}</td>
    <td>${document.getElementById('copies').value}</td>
    <td class="available">Available</td>
    <td>-</td>
    <td>-</td>
    <td>
      <button onclick="borrowBook(this)">Borrow</button>
      <button onclick="deleteBook(this)">Delete</button>
    </td>
  `;

  this.reset();
});

// Delete book
function deleteBook(btn) {
  if(confirm("Are you sure you want to delete this book?")){
    btn.closest('tr').remove();
  }
}

// Borrow book
function borrowBook(btn) {
  let row = btn.closest('tr');
  let statusCell = row.cells[5];
  if(statusCell.innerText === "Available") {
    let borrower = prompt("Enter borrower name:");
    if(borrower) {
      statusCell.innerText = "Issued";
      statusCell.className = "issued";
      row.cells[6].innerText = borrower;
      let today = new Date();
      let returnDate = new Date();
      returnDate.setDate(today.getDate() + 14); // 2 weeks
      row.cells[7].innerText = returnDate.toLocaleDateString();
      btn.innerText = "Return";
      btn.onclick = function() { returnBook(this); };
    }
  }
}

// Return book
function returnBook(btn) {
  let row = btn.closest('tr');
  row.cells[5].innerText = "Available";
  row.cells[5].className = "available";
  row.cells[6].innerText = "-";
  row.cells[7].innerText = "-";
  btn.innerText = "Borrow";
  btn.onclick = function() { borrowBook(this); };
}
