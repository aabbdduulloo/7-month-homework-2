import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserModal from "../modal/modal";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const [viewModal, setViewModal] = useState(false); // State for view modal
  const [viewUser, setViewUser] = useState({}); // State for user to view details

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error occurred while fetching users:", error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    setUser({});
  };

  const deleteUser = async id => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`);
      if (response.status === 200) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error occurred while deleting user:", error);
    }
  };

  const openEditModal = item => {
    setUser(item);
    setModal(true);
  };

  const openViewModal = item => {
    setViewUser(item);
    setViewModal(true);
  };

  const closeViewModal = () => {
    setViewModal(false);
    setViewUser({});
  };

  return (
    <>
      <UserModal
        isOpen={modal}
        toggle={toggleModal}
        user={user}
        fetchUsers={fetchUsers}
      />
      <Modal isOpen={viewModal} toggle={closeViewModal}>
        <ModalHeader toggle={closeViewModal}>User Details</ModalHeader>
        <ModalBody>
          <h5>Name: {viewUser.name}</h5>
          <p>Email: {viewUser.email}</p>
          <p>Number: {viewUser.number}</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={closeViewModal}>
            Close
          </button>
        </ModalFooter>
      </Modal>
      <div className="container">
        <h1 className="text-center my-3">Users</h1>
        <button className="btn btn-success my-3" onClick={toggleModal}>
          Add User
        </button>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => deleteUser(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info mx-1"
                    onClick={() => openViewModal(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
