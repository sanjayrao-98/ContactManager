import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export const Update = () => {
  const { ID } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + ID)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          Name: res.data[0].Name,
          Email: res.data[0].Email,
          Phone_No: res.data[0].Phone_No,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    Name: "",
    Email: "",
    Phone_No: "",
  });

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(values.Phone_No)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    axios
      .put("http://localhost:8081/update/" + ID, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex vh-100 justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <form onSubmit={handleUpdate}>
          <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control w-full px-3 py-2 border "
              value={values.Name}
              onChange={(e) => setValues({ ...values, Name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email id"
              className="form-control w-full px-3 py-2 border"
              value={values.Email}
              onChange={(e) => setValues({ ...values, Email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              className="form-control w-full px-3 py-2 border "
              value={values.Phone_No}
              onChange={(e) =>
                setValues({ ...values, Phone_No: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success text-white px-3 py-2 rounded me-2 ">
            Update
          </button>
          <Link to="/" className="btn btn-primary px-4 py-2 rounded">Back</Link>
        </form>
      </div>
    </div>
  );
};
