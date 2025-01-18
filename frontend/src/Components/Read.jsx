import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export const Read = () => {
  const { ID } = useParams();
  const [contact, setContact] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + ID)
      .then((res) => {
        console.log(res);
        setContact(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className ="flex vh-100  justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Student Detail</h2>
        <h4>ID: {contact.ID}</h4>
        <h4>Name: {contact.Name}</h4>
        <h4>Email: {contact.Email}</h4>
        <h4>Phone Number: {contact.Phone_No}</h4>
        <Link to="/" className="btn btn-primary me-4">Back</Link>
        <Link to={`/edit/${contact.ID}`} className="btn btn-info">Edit</Link>
      </div>
    </div>
  );
};
