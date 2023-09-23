document.addEventListener("DOMContentLoaded", function () {
  let studentData = [];

  // fetch student data from Url

  fetch(
    "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
  )
    .then((response) => response.json())
    .then((data) => {
      studentData = data;
      displayStudents(studentData);
    })
    .catch(error => console.error("Error fetching data:", error));

  //Display StudentData
  function displayStudents(students) {
    const tableBody = document.getElementById("students-data");
    tableBody.innerHTMl = "";

    students.forEach(student => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.id}</td>
                <td>
                    <img src="./Assets/dp 1.png" alt="Student Image" width="25">
                    ${student.first_name} ${student.last_name}
                </td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? "Passing" : "Failed"}</td>
                <td>${student.email}</td>
                `;
      tableBody.appendChild(row);
    });
  }

  // Sort By Name
  function sortByFullName(order) {
    studentData.sort((a, b) => {
      const fullNameA = `${a.first_name} ${a.last_name}`;
      const fullNameB = `${b.first_name} ${b.last_name}`;
      return order === "asc"
        ? fullNameA.localeCompare(fullNameB)
        : fullNameB.localeCompare(fullNameA);
    });
    displayStudents(studentData);
  }

  // Sort By Marks
  function sortByMarks() {
    studentData.sort((a, b) => a.marks - b.marks);
    displayStudents(studentData);
  }

  //Sort By Passing
  function sortByPassing() {
    const passingStudents = studentData.filter((student) => student.passing);
    displayStudents(passingStudents);
  }

  //Sort By Class
  function sortByClass() {
    studentData.sort((a, b) => a.class - b.class);
    displayStudents(studentData);
  }

  //Sort By Gender
  function sortByGender() {
    const maleStudents = studentData.filter(student => student.gender.toLowerCase() === "male"
    );
    const femaleStudents = studentData.filter(student => student.gender.toLowerCase() === "female"
    );

    // Display both tables Male & Female
    const combinedStudents = [...maleStudents, ...femaleStudents];
    displayStudents(combinedStudents);
  }


//Adding eventListeners to Buttons
  document.getElementById('sort-az').addEventListener('click', () => sortByFullName('asc'));
  document.getElementById("sort-za").addEventListener("click", () => sortByFullName("desc"));
  document.getElementById("sort-marks").addEventListener("click", sortByMarks);
  document.getElementById("sort-passing").addEventListener("click", sortByPassing);
  document.getElementById("sort-class").addEventListener("click", sortByClass);
  document.getElementById("sort-gender").addEventListener("click", sortByGender);

  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById("search-btn");
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = studentData.filter(
      (student) =>
        student.first_name.toLowerCase().includes(searchTerm) ||
        student.last_name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    displayStudents(filteredStudents);
  });
});
