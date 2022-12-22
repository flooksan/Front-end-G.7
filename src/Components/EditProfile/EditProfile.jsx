import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../Register/Register.css";

const Register = () => {
  //start img
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  //ed img

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = () => navigate('/profile');
  // const onSubmit = (data) => console.log(data);
  return (
    <form className="boxs" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-register">
        <h1>EditProfile</h1>
        <div className="f-input">
          <label>Email:</label><br/>
          <TextField
            required
            name="email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
            })}
          />
        </div>
        {/* <error>
          {errors.email?.type === "required" && "Email is required"}
          {errors.email?.type === "pattern" &&
            "Entered email is in wrong format"}
        </error> */}
        <div className="f-input">
          <label>Fisrtname:</label><br/>
          <TextField
            required
            name="fisrtname"
            {...register("fisrtname", { required: true })}
          />
        </div>
        <div className="f-input">
          <label>Lastname:</label><br/>
          <TextField
            required
            name="lastname"
            {...register("lastname", { required: true })}
          />
        </div>
        <div className="f-input">
          <label>Displayname:</label><br/>
          <TextField
            required
            name="displayname"
            {...register("displayname", { required: true })}
          />
        </div>
        <div className="f-input">
          <label>Height:</label><br/>
          <TextField
            required
            name="height"
            type="number"
            {...register("height", { required: true })}
          />
          <label>Cm.</label>
        </div>
        <div className="f-input">
          <label>Weight:</label><br/>
          <TextField
            required
            name="weight"
            type="number"
            {...register("weight", { required: true })}
          />
          <label>Kg.</label>
        </div>
        <div className="f-input">
          <label>Address:</label><br/>
          <TextField
            name="address"
            aria-label="minimum height"
            minRows={3}
            // placeholder="Minimum 3 rows"
            style={{ width: 200 }}
            {...register("address", { required: true })}
          />
        </div>
        <div className="f-button">
          <Button
            variant="contained"
            type="submit"
            onSubmit="handleSubmit"
            style={{
              backgroundColor: "#50A5B1",
              width: "100px",
              height: "30px",
            }}
          >
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "white" }}
            >
              Back
            </Link>
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#C32B42",
              width: "100px",
              height: "30px",
            }}
          >
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "white" }}
            >
              Save
            </Link>
          </Button>
        </div>
      </div>

      <div className="form-register-image">
      <Button variant="contained" component="label" style={{
              backgroundColor: "#50A5B1",
              width: "100px",
              height: "30px",
            }}>
          Upload
        <input hidden type="file"   multiple accept="image/*" onChange={onImageChange} />
        </Button>
        {imageURLs.map((imageSrc, idx) => (
          <img key={idx} width="240" height="260" src={imageSrc} />
        ))}
      </div>
    </form>
  );
};

export default Register;
