import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Row, Table } from "reactstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");

  const { id } = useParams();

  const loadUsers = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.get(
        "http://localhost:9090/api/elearning/admin/users",

        config
      );

      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (userId) => {
    const { data } = await axios.delete(
      `http://localhost:9090/api/elearning/admin/deleteuser/${userId}`
    );
    setDeleteMessage(data);
    alert(deleteMessage);
    loadUsers();
  };

  return (
    <Container className="py-5">
      <div className="container mt-5">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phoneNo}</td>
                  <td>{user.email}</td>
                  {/* <td>{user.address}</td> */}
                  <td>
                    {/* <Link
                      className="btn btn-primary mx-2"
                      to={`/viewuser/${user.id}`}
                    >
                      View
                    </Link> */}
                    {/* <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/edituser/${user.id}`}
                    >
                      Edit
                    </Link> */}
                    {/* -------------------------------  changes are done here for admin ------------------*/}
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.userId)}
                    disabled={user.firstName==="admin" ? true : false}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

export default ManageUsers;
