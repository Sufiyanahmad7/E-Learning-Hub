import React, { useEffect, useState } from "react";
import {Container} from "reactstrap";
import axios from "axios";
import {useParams } from "react-router-dom";


function ApproveRequest() {
  const [users, setUsers] = useState([]);

  const { userId } = useParams();

  // get user id

  const loadUsers = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.get(
        `http://localhost:9090/api/elearning/admin/approve/instructor`,

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

  const handleApprove = async (user) => {
    console.log(user);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.put(
        "http://localhost:9090/api/elearning/admin/approveuser",
        {
          apvId: user.apvId,
          qualification: user.qualification,
          exp: user.exp,
          certi: user.certi,
          desc: user.desc,
          status: "yes",
          uiId: user.uiId,
        },

        config
      );

      // setUsers(data);
      alert(data);
      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleReject = async (userId) => {
  //     const { data } = await axios.(
  //       `http://localhost:9090/api/elearning/admin/rejectuser/${userId}`
  //     );
  //     setDeleteMessage(data);
  //     alert(deleteMessage);
  //     loadUsers();
  //   };

  return (
    <Container className="py-5">
      <div className="container mt-5" style={{ minHeight: "55vh" }}>
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Qualification</th>
                <th scope="col">Experience</th>
                <th scope="col">Certifications</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">User Id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{user.qualification}</td>
                  <td>{user.exp}</td>
                  <td>{user.certi}</td>
                  <td>{user.desc}</td>
                  <td>{user.status}</td>
                  <td>{user.uiId}</td>
                  <td>
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => handleApprove(user)}
                      disabled={user.status === "no" ? false : true}
                    >
                      Approve
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

export default ApproveRequest;
