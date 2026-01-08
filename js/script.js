function searchBook() {
  let input = document.getElementById("search").value.toLowerCase();
  let rows = document.querySelectorAll("table tr");

  rows.forEach((row, index) => {
    if (index === 0) return;
    row.style.display = row.innerText.toLowerCase().includes(input)
      ? ""
      : "none";
  });
}
