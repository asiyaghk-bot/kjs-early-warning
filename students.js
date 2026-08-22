
const students = JSON.parse(localStorage.getItem("students")) || [];
const studentList = document.querySelector("#studentList");
const studentSearch = document.querySelector("#studentSearch");
const departmentFilter =
    document.querySelector("#departmentFilter");

const semesterFilter =
    document.querySelector("#semesterFilter");

const riskFilter =
    document.querySelector("#riskFilter");
const totalCount =
    document.querySelector("#totalCount");

const highCount =
    document.querySelector("#highCount");

const mediumCount =
    document.querySelector("#mediumCount");

const safeCount =
    document.querySelector("#safeCount");

const emptyMsg =
    document.querySelector("#emptyMsg");

function calculateRisk(student) {
    const attendance = Number(student.attendance);
    const marks = Number(student.marks);
    const assignments = Number(student.assignments);

    if (
        isNaN(attendance) ||
        isNaN(marks) ||
        isNaN(assignments)
    ) {
        return "Not calculated";
    }


    if (
        attendance < 50 ||
        marks < 50 ||
        assignments < 50
    ) {
        return "High Risk";
    }


    if (
        attendance < 75 ||
        marks < 60 ||
        assignments < 70
    ) {
        return "Medium Risk";
    }


    return "Safe";
}



function displayStudents(studentArray) {

    studentList.innerHTML = "";

    if (studentArray.length === 0) {

        emptyMsg.style.display = "block";

        return;
    }

    emptyMsg.style.display = "none";

    studentArray.forEach(function(student) {
        const row = document.createElement("tr");

        const risk = calculateRisk(student);

        let riskClass = "";

        if (risk === "High Risk") {

            riskClass = "high";

        }
        else if (risk === "Medium Risk") {

            riskClass = "medium";

        }
        else if (risk === "Safe") {

            riskClass = "safe";

        }
        row.innerHTML = `

            <td class="student-id">
                ${student.id}
            </td>

            <td class="student-name">
                ${student.name}
            </td>

            <td>
                <span class="dept-badge">
                    ${student.department}
                </span>
            </td>

            <td>
                ${student.semester}
            </td>

            <td>
                ${
                    student.attendance !== undefined &&
                    student.attendance !== ""
                    ? student.attendance + "%"
                    : "—"
                }
            </td>

            <td>
                ${
                    student.marks !== undefined &&
                    student.marks !== ""
                    ? student.marks + "%"
                    : "—"
                }
            </td>

            <td>
                ${
                    student.assignments !== undefined &&
                    student.assignments !== ""
                    ? student.assignments + "%"
                    : "—"
                }
            </td>

            <td>

                ${
                    risk === "Not calculated"

                    ? "Not calculated"

                    : `
                        <span class="risk-badge ${riskClass}">
                            ${risk}
                        </span>
                      `
                }

            </td>
            <td>
                <button class="action-btn view">
                    View
                </button>

            </td>
        `;
        studentList.appendChild(row);
    });
}

function updateCounts() {
    let high = 0;

    let medium = 0;

    let safe = 0;

    students.forEach(function(student) {
        const risk = calculateRisk(student);

        if (risk === "High Risk") {
            high++;
        }
        else if (risk === "Medium Risk") {
            medium++;
        }
        else if (risk === "Safe") {
            safe++;
        }
    });

    totalCount.textContent = students.length;
    highCount.textContent = high;
    mediumCount.textContent = medium;
    safeCount.textContent = safe;
}

function filterStudents() {

    const searchText =
        studentSearch.value.toLowerCase();

    const selectedDepartment =
        departmentFilter.value;

    const selectedSemester =
        semesterFilter.value;

    const selectedRisk =
        riskFilter.value;
    const filteredStudents =
        students.filter(function(student) {
            const studentName =
                String(student.name).toLowerCase();
            const studentId =
                String(student.id).toLowerCase();
            const matchesSearch =
                studentName.includes(searchText) ||
                studentId.includes(searchText);
            const matchesDepartment =
                selectedDepartment === "ALL" ||
                String(student.department).toUpperCase() ===
                selectedDepartment;
            const matchesSemester =
                selectedSemester === "ALL" ||
                String(student.semester) ===
                selectedSemester;
            const matchesRisk =
                selectedRisk === "ALL" ||
                calculateRisk(student) ===
                selectedRisk;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesSemester &&
                matchesRisk

            );
        });

    displayStudents(filteredStudents);
}


studentSearch.addEventListener(
    "input",
    filterStudents
);


departmentFilter.addEventListener(
    "change",
    filterStudents
);


semesterFilter.addEventListener(
    "change",
    filterStudents
);


riskFilter.addEventListener(
    "change",
    filterStudents
);



function openModal() {

    document.querySelector(
        "#modalBackdrop"
    ).style.display = "flex";
}


function closeModal() {

    document.querySelector(
        "#modalBackdrop"
    ).style.display = "none";
}


function addStudent() {

    const id =
        document.querySelector("#newId").value.trim();


    const name =
        document.querySelector("#newName").value.trim();


    const department =
        document.querySelector("#newDept").value;


    const semester =
        document.querySelector("#newSem").value;


    const attendance =
        document.querySelector("#newAttendance").value;


    const marks =
        document.querySelector("#newMarks").value;


    const assignments =
        document.querySelector("#newAssignments").value;


    if (

        id === "" ||

        name === "" ||

        attendance === "" ||

        marks === "" ||

        assignments === ""

    ) {

        alert(
            "Please fill in all student details."
        );

        return;
    }


    const newStudent = {

        id: id,

        name: name,

        department: department,

        semester: semester,

        attendance: attendance,

        marks: marks,

        assignments: assignments

    };


    students.push(newStudent);


    localStorage.setItem(

        "students",

        JSON.stringify(students)

    );


    updateCounts();

    filterStudents();


    closeModal();


    document.querySelector("#newId").value = "";

    document.querySelector("#newName").value = "";

    document.querySelector("#newAttendance").value = "";

    document.querySelector("#newMarks").value = "";

    document.querySelector("#newAssignments").value = "";


    alert(
        "Student added successfully!"
    );
}



const apiFeatures =
    document.querySelectorAll(".api-feature");


apiFeatures.forEach(function(feature) {

    feature.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            alert(
                "This feature requires backend and API integration with institutional data sources."
            );

        }
    );

});
const importStudentsBtn = document.querySelector("#importStudentsBtn");
const csvFile = document.querySelector("#csvFile");

if (importStudentsBtn && csvFile) {
    importStudentsBtn.addEventListener("click", function() {
        csvFile.click();
    });

    csvFile.addEventListener("change", function() {
        const file = csvFile.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const rows = event.target.result.trim().split(/\r?\n/);

            for (let i = 1; i < rows.length; i++) {
                if (rows[i].trim() === "") {
                    continue;
                }

                const values = rows[i].split(",").map(function(value) {
                    return value.trim();
                });

                const student = {
                    id: values[0],
                    name: values[1],
                    department: values[2],
                    semester: values[3],
                    attendance: values[4],
                    marks: values[5],
                    assignments: values[6]
                };

                students.push(student);
            }

            localStorage.setItem("students", JSON.stringify(students));

            updateCounts();
            filterStudents();

            alert("Students imported successfully!");

            csvFile.value = "";
        };

        reader.readAsText(file);
    });
}

updateCounts();

displayStudents(students);