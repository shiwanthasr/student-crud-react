import React, { useState, useEffect } from "react";
import AddStudent from "./AddStudent";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

function Students({setLoader}) {

  const [students, setSudents] = useState([]);
  const [newStudentData, setNewStudentData] = useState({});
  const [noData, setNodata] = useState('');
  
  useEffect(() => {
    const fetchStudents = async () => {
      setLoader(true);
      await axios
        .get("http://localhost:8000/api/students")
        .then((response) => {
          //console.log(response);
          
          if (response.status === 200 && response.data.count > 0) {
            setSudents(response.data.data);
            setLoader(false);
          }else{
            setNodata(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
          //alert(err.response.status === 500 ? "Fail!" : "");
        });
    };

    fetchStudents();
  }, []);

  const inputStudentHandler = (e) => {
    newStudentData[e.target.name] = e.target.value;
    //console.log({ newStudentData });
    setNewStudentData(newStudentData);
  }

  const addNewStudentHandler = (e) => {
    e.preventDefault();
    
    const createStudent = async () => {

      await axios({
        headers:{
          'Accept': '*',
          'Content-Type': 'application/json'
        },
        method:"post",
        url:"http://localhost:8000/api/create-student",
        data:newStudentData
      }).then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              //setSudents([...students, response.data]);
            }
          })
          .catch((err) => console.log(err));

    };
  
    createStudent();

  }

  return (
    <div className="Students container mt-4">

      <h4 className="font-weight-bold">Student Registration</h4>
      <AddStudent inputStudentHandler={inputStudentHandler} addNewStudentHandler={addNewStudentHandler}/>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {( students.length > 0 ) ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.full_name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                  <Button variant="success" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">{noData}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Students;
