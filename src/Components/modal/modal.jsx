import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const UserModal = ({ isOpen, toggle, user, fetchUsers }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!form.id) {
        const response = await axios.post("http://localhost:3000/users", form);
        if (response.status === 201) {
          fetchUsers();
          toggle();
        }
      } else {
        const response = await axios.put(
          `http://localhost:3000/users/${form.id}`,
          form
        );
        if (response.status === 200) {
          fetchUsers();
          toggle();
        }
      }
    } catch (error) {
      console.error("Error occurred while saving data:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {form.id ? "Edit User" : "Add New User"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={form.name || ""}
            className="form-control my-2"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email || ""}
            className="form-control my-2"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Number"
            name="number"
            value={form.number || ""}
            className="form-control my-2"
            onChange={handleChange}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-secondary" onClick={toggle}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
