const createElement = (item, containerTable) => {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `
    <td>${item.id}</td>
    <td>${item.isbn}</td>
    <td>${item.title}</td>
    <td>${item.director.firstName}</td>
    <td>${item.director.secondName}</td>
    <button class="update_button">Update</button>
    <button class="delete_button">Delete</button>
  `;
  containerTable.current.appendChild(tableRow);
};

export default createElement;