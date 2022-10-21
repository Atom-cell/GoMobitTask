import React from "react";
import axios from "axios";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Label,
  Table,
} from "reactstrap";
const ViewUsers = () => {
  const [name, setName] = React.useState("All");
  const [data, setData] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);

  React.useEffect(() => {
    AllUsers();
  }, []);

  const AllUsers = () => {
    axios.get("http://localhost:5000/user/").then((response) => {
      setAllUsers(response.data);
      setData(response.data);
    });
  };

  const getUserInfo = () => {
    if (name === "All") {
      AllUsers();
    } else {
      axios.get(`http://localhost:5000/user/${name}`).then((response) => {
        setData(response.data);
      });
    }
  };
  return (
    <div>
      <h1>View Users</h1>

      <div style={{ display: "flex", marginBottom: "2em" }}>
        <Label style={{ marginRight: "1em" }}>Search User</Label>
        <UncontrolledDropdown>
          <DropdownToggle caret>{name}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={(e) => setName("All")}>All</DropdownItem>
            {allUsers.map((u, index) => {
              return (
                <DropdownItem onClick={(e) => setName(u.name)} key={index}>
                  {u.name}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </UncontrolledDropdown>
        <Button
          style={{ marginLeft: "2em", backgroundColor: "#0d6efd" }}
          onClick={() => getUserInfo()}
        >
          Search
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Cell No.</th>
            <th>Created At</th>
            <th>Delete At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.cell}</td>
                <td>{d.createdAt.slice(0, 10)}</td>
                <td>{d.deletedAt ? d.deletedAt.slice(0, 10) : null}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewUsers;
