import { useEffect, useState } from "react";
import "./App.css";
import { EmployeeData } from "./EmpData";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [isUdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((emp) => emp.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFname(dt[0].firstname);
      setLname(dt[0].lastname);
      setEmail(dt[0].email);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to Delete this Employee")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleClear = () => {
    const dt = data.filter((emp) => emp.id === id);
    if (dt !== undefined) {
      setId(0);
      setFname("");
      setLname("");
      setEmail("");
      setIsUpdate(false);
    }
  };

  const handleUpdate = () => {
    // e.preventDefault();
    const index = data
      .map((emp) => {
        return emp.id;
      })
      .indexOf(id);
    const dt = [...data];
    dt[index].firstname = fname;
    dt[index].lastname = lname;
    dt[index].email = email;
    setData(dt);
    setIsUpdate(false);
    handleClear();
  };

  const handleSave = (e) => {
    let error = "";
    if (fname === "") error += "Enter First Name, ";
    if (lname === "") error += "Enter Last Name, ";
    if (email === "") error += "Enter email. ";
    if (error === "") {
      e.preventDefault();
      const dt = [
        ...data,
        {
          id: EmployeeData.length + 1,
          firstname: fname,
          lastname: lname,
          email: email,
        },
      ];
      setData(dt);
      handleClear();
    } else alert(error);
  };

  return (
    <>
      <section className="App text-white">
        <div className="container-fluid">
          <div className="bg">
            <div className="mb-5 col-md-12">
              <h1>CRUD OPERATIONS</h1>
            </div>
            <form className="form">
              <div className="row mb-5 justify-content-center align-items-end">
                <div className="form-group  col-lg-3 col-md-4 col-sm-12">
                  <label className="">First Name:</label>
                  <br />
                  <input
                    type="text"
                    className="form-control border py-2 px-4 rounded bg-transparent text-white form-control"
                    placeholder="Enter your First Name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="form-group col-lg-3 col-md-4 col-sm-12">
                  <label className="">Last Name:</label>
                  <br />
                  <input
                    type="text"
                    className="form-control border py-2 px-4 rounded bg-transparent text-white"
                    placeholder="Enter your Last Name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
                <div className="form-group col-lg-3 col-md-4 col-sm-12">
                  <label className="" for="exampleInputEmail1">
                    Email:
                  </label>
                  <br />
                  <input
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    type="email"
                    className="form-control border py-2 px-4 rounded bg-transparent text-white"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group col-lg-3 col-md-12 col-sm-12 mt-5 text-center">
                  {!isUdate ? (
                    <button className="saveEdit" onClick={(e) => handleSave(e)}>
                      Save
                    </button>
                  ) : (
                    <button className="saveEdit" onClick={() => handleUpdate()}>
                      UpDate
                    </button>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <button className="clearDelete" onClick={() => handleClear()}>
                    Clear
                  </button>
                </div>
              </div>
            </form>
            <div className="overflow">
              <table className="table text-white border">
                <thead>
                  <tr className="">
                    <td className="thead">Sri-No</td>
                    <td className="thead">Id</td>
                    <td className="thead">First Name</td>
                    <td className="thead">Last Name</td>
                    <td className="thead">Email</td>
                    <td className="thead">Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {data.map((emp, index) => {
                    return (
                      <tr key={index}>
                        <td className="tdata">{index + 1}</td>
                        <td className="tdata">{emp.id}</td>
                        <td className="tdata">{emp.firstname}</td>
                        <td className="tdata">{emp.lastname}</td>
                        <td className="tdata">{emp.email}</td>
                        <td className="tdata">
                          <button
                            className="saveEdit mb-2"
                            onClick={() => handleEdit(emp.id)}
                          >
                            Edit
                          </button>
                          &nbsp;
                          <button
                            className="clearDelete"
                            onClick={() => handleDelete(emp.id)}
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
        </div>
      </section>
    </>
  );
}

export default App;
