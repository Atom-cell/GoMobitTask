import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledAlert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState({
    email: false,
    age: false,
  });
  const [cell, setCell] = React.useState("");
  const [age, setAge] = React.useState(null);
  const [resp, setResp] = React.useState(9);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!error.age && !error.email) {
      axios
        .post("http://localhost:5000/user/add", {
          name: name,
          email: email,
          cell: cell,
          age: age,
        })
        .then((response) => {
          setResp(response.data.msg);

          console.log("db msg ", response.data.msg);
          if (response.data.msg === 1) {
            setTimeout(() => {
              navigate("/view");
            }, 1000);
          }
        });
      setName("");
      setEmail("");
      setAge(0);
      setCell("");
      setResp(9);
    }
  };

  const checkEmail = () => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      let err = { ...error };
      err.email = false;
      setError(err);
    } else {
      let err = { ...error };
      err.email = true;
      setError(err);
    }
  };

  const checkAge = () => {
    if (age < 18 || age > 60) {
      let err = { ...error };
      err.age = true;
      setError(err);
    } else {
      let err = { ...error };
      err.age = false;
      setError(err);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      {error.fields && <p style={{ color: "red" }}>Fill All the fields!</p>}

      {resp === 0 ? (
        <UncontrolledAlert color="danger">
          User already exists!
        </UncontrolledAlert>
      ) : resp === 1 ? (
        <UncontrolledAlert color="success">
          User added successfully!
        </UncontrolledAlert>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "70%" }}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmail()}
            style={{ width: "70%" }}
          />
          {error.email && <p style={{ color: "red" }}>Enter valid Email</p>}
        </FormGroup>
        <FormGroup>
          <Label>Cell #</Label>
          <Input
            type="text"
            value={cell}
            onChange={(e) => setCell(e.target.value)}
            style={{ width: "70%" }}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Age</Label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onBlur={() => checkAge()}
            style={{ width: "70%" }}
          />
          {error.age && (
            <p style={{ color: "red" }}>Age can be between 18 and 60</p>
          )}
        </FormGroup>

        <Button style={{ backgroundColor: "#0d6efd" }}>Submit</Button>
      </Form>
    </div>
  );
};

export default AddUser;
