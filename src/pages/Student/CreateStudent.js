import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

export default function CreateStudent() {
  // 2.1 Hooks Area
  const [teacherIds, setTeacherIds] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [students, setStudents] = useState([]);
  const [teacherName, setTeacherName] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/api/students?populate=*`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Students===>", data.data);
        setStudents(data.data);
      })
      .catch();
    // I want to call the get all teacher api
    fetch(`http://localhost:1337/api/teachers`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Teachers===>", data.data);
        setTeacher(data.data);
      })
      .catch(() => {});
  }, []);
  //2.2 function definition area
  let createStudent = () => {
    //  alert("OKK");
    //  console.log(document.getElementById("teacher").value);
    let payload = {
      data: {
        name: document.getElementById("student_name").value,
        teachers: teacherIds,
      },
    };
    console.log(payload);

    fetch(`http://localhost:1337/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert("Student Inserted Successfully");
        // window.location.reload();
        document.querySelector("table#myTable > tbody").innerHTML += `<tr>
       <td>1</td>
       <td>${document.getElementById("student_name").value}</td>
       <td>${teacherName}</td>
       <td>
         <button className="btn btn-danger btn-sm me-1">View</button>
         <button className="btn btn-primary btn-sm me-1">
           Edit
         </button>
         <button
           id=""
           className="btn btn-success btn-sm me-1">
           Delete
         </button>
       </td>
     </tr> `;
        console.log(data);
      })
      .catch();
  };
  let deletStudent = (e) => {
    let tr = e.target.closest("tr");
    // console.log(tr.querySelector("td:first-child").innerHTML);
    let sid = tr.querySelector("td:first-child").innerHTML;

    let x = window.confirm("Are you want to delete student");
    console.log(typeof x);
    if (x === true) {
      // alert("let's call the delete API");
      fetch(`http://localhost:1337/api/students/${sid}`, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          tr.remove();
          alert("Delete the  Students successfully");
        })
        .catch((err) => console.log(err));
    }
    // alert("delete msg");
  };

  const handleSelect = function (selectedItems) {
    const teacherids = [];
    for (let i = 0; i < selectedItems.length; i++) {
      teacherids.push(parseInt(selectedItems[i].value));
    }
    setTeacherIds(teacherids);
  };
  // let btncheck = () => {
  //   alert(teacherIds);
  // };
  //2.3 reaturn area
  return (
    <>
      <div className="container">
        {/* <button
          onClick={() => {
            btncheck();
          }}
        >
          My test Button
        </button> */}
        <h3 className="text-center mt-4">Create Student</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Teacher</Form.Label>
            <Form.Select
              multiple={true}
              value={teacherIds}
              id="teacher"
              name="teacher[]"
              aria-label="Default select example"
              onChange={(e) => {
                handleSelect(e.target.selectedOptions);
              }}
            >
              {teacher.map((cv, idx, arr) => {
                console.log(cv);
                return (
                  <option key={idx} value={cv.id} id="option">
                    {cv.attributes.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              id="student_name"
              placeholder="Enter name"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              createStudent();
            }}
          >
            Submit
          </Button>
        </Form>
        <br />
        <hr />
        <br />
        <Table striped bordered hover id="myTable">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Teacher Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((cv, idx, arr) => {
              return (
                <tr key={idx}>
                  <td>{cv.id}</td>
                  <td>{cv.attributes.name}</td>
                  <td>
                    {cv.attributes.teachers.data
                      .map((cv2, idx2, arr2) => {
                        return cv2.attributes.name;
                      })
                      .toString()}
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm me-1">View</button>
                    <button className="btn btn-primary btn-sm me-1">
                      Edit
                    </button>
                    <button
                      id={`sid ${cv.id} `}
                      className="btn btn-success btn-sm me-1"
                      onClick={(e) => {
                        deletStudent(e);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
