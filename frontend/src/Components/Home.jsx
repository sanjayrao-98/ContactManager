import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [searchterm, setSearchterm] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        setData(res.data);
        setfilteredData(res.data)
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  const handleDelete = (ID) => {
    axios
      .delete("http://localhost:8081/delete/" + ID)
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchterm(term);

    const filtered = data.filter(
      (contact) =>
        contact.Name.toLowerCase().includes(term) ||
        contact.Email.toLowerCase().includes(term) ||
        contact.Phone_No.includes(term)
    );
    setfilteredData(filtered)
  };

  return (
    <div className="container mt-5 bg-light  p-4 rounded">
      <h2 className="text-center mb-4">Contact List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Email, or Phone_Number"
          className="form-control"
          value={searchterm}
          onChange={handleSearch}
        />
      </div>
      <div className="d-flex justify-content-end ">
        <Link to="/create" className="btn btn-success btn-sm my-2">
          create +{" "}
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-bordered bg-light">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((contact) => {
              return (
                <tr key={contact.ID}>
                  <td>{contact.ID}</td>
                  <td>{contact.Name}</td>
                  <td>{contact.Email}</td>
                  <td>{contact.Phone_No}</td>
                  <td>
                    <Link
                      to={`/read/${contact.ID}`}
                      className="btn bg-warning btn-sm me-2"
                    >
                      Read
                    </Link>
                    <Link
                      to={`/edit/${contact.ID}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(contact.ID)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;