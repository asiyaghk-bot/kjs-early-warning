
const importStudentsBtn = document.querySelector("#importStudentsBtn");
const csvFile = document.querySelector("#csvFile");

const addStudentBtn = document.querySelector("#addStudentBtn");
const studentModal = document.querySelector("#studentModal");
const closeModal = document.querySelector("#closeModal");

const saveStudent = document.querySelector("#saveStudent");

let students = JSON.parse(localStorage.getItem("students")) || [];

if (addStudentBtn && studentModal) {

    addStudentBtn.addEventListener("click", function () {

        studentModal.style.display = "flex";

    });

}

if (closeModal && studentModal) {

    closeModal.addEventListener("click", function () {

        studentModal.style.display = "none";

    });

}

if (saveStudent) {
    saveStudent.addEventListener("click", function () {
        const name =
            document.querySelector("#studentName").value.trim();
        const id =
            document.querySelector("#studentId").value.trim();
        const department =
            document.querySelector("#department").value;
        const semester =
            document.querySelector("#semester").value;

        if (
            name === "" ||
            id === "" ||
            department === "" ||
            semester === ""
        ) {

            alert("Please fill in all student details.");

            return;
        }
        const newStudent = {
            name: name,
            id: id,
            department: department,
            semester: semester

        };
        students.push(newStudent);
        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );
        console.log(students);
        if (studentModal) {
            studentModal.style.display = "none";
        }
        document.querySelector("#studentName").value = "";
        document.querySelector("#studentId").value = "";
        document.querySelector("#department").value = "";
        document.querySelector("#semester").value = "";

    });

}
if (importStudentsBtn && csvFile) {

    importStudentsBtn.addEventListener("click", function () {

        csvFile.click();

    });
    csvFile.addEventListener("change", function () {
        const file = csvFile.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const csvText = event.target.result;
            const rows = csvText
                .trim()
                .split(/\r?\n/);

            for (let i = 1; i < rows.length; i++) {

                if (rows[i].trim() === "") {
                    continue;
                }

                const values = rows[i]
                    .split(",")
                    .map(function (value) {
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
            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            alert("Students imported successfully!");

            csvFile.value = "";

        };

        reader.readAsText(file);

    });

}
const apiFeatures =
    document.querySelectorAll(".api-feature");

apiFeatures.forEach(function (feature) {

    feature.addEventListener("click", function (event) {

        event.preventDefault();

        alert(
            "This feature requires backend and API integration with institutional data sources."
        );

    });

});