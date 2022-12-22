import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Register.css";
import { register as registerAxios } from '../Functions/auth'
import FileUpload from "./FileUpload";
import Swal from 'sweetalert2'

const Register = () => {
  //start img
  // const [images, setImages] = useState([]);
  // const [imageURLs, setImageURLs] = useState([]);
  const navigate = useNavigate();


  // useEffect(() => {
  //   if (images.length < 1) return;
  //   const newImageUrls = [];
  //   images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
  //   setImageURLs(newImageUrls);
  // }, [images]);

  // function onImageChange(e) {
  //   setImages([...e.target.files]);
  // }
  //ed img
  const [value, setValue] = useState({
    images: []
  })
  const {
    register,
    watch,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    // console.log(value.images);
    data.images = value.images
    // console.log(data);
    registerAxios(data)
    Swal.fire(
      'Register Success!',
      'You clicked the button!',
      'success'
    ) 
    navigate('/');
  }
  // const onSubmit = (data) => /แสดงข้อมูลให้ดู

  return (
    <form className="boxs" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-register">
        <h1>Create a new account</h1>
        <div className="f-input">
          <label>Email:</label>
          <br />
          <TextField
            required
            name="username"
            label="Email"
            type="email"
            {...register("username", {
              required: true,
              pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
            })}
          />
        </div>
        <div className="f-input">
          <label>Password:</label>
          <br />
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
          />
          {errors?.password?.type === "required" && <p>This field is required</p>}
          {errors?.password?.type === "minLength" && (
            <p>password cannot less than 5 characters</p>
          )}
        </div>

        <div className="f-input">
          <label>RepeatPassword:</label>
          <br />
          <TextField
            required
            name="password1"
            label="RepeatPassword"
            type="password"
            {...register("password1", {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
          />
          {watch("password1") !== watch("password") &&
            getValues("password1") ? (
            <p>password not match</p>
          ) : null}
        </div>
        <div className="f-input">
          <label>Fisrtname:</label>
          <br />
          <TextField
            required
            name="fisrtname"
            label="Name"
            {...register("fisrtname", { required: true })}
          />
        </div>
        <div className="f-input">
          <label>Lastname:</label>
          <br />
          <TextField
            required
            name="lastname"
            label="Lastname"
            {...register("lastname", { required: true })}
          />
        </div>
        <div className="f-input">
          <label>Displayname:</label>
          <br />
          <TextField
            required
            name="displayname"
            label="Display name"
            {...register("displayname", { required: true })}
          />
        </div>
        <div className="f-input">
          <label>Height:</label>
          <br />
          <TextField
            required
            name="height"
            label="Height"
            type="number"
            {...register("height", { required: true })}
          />
          <label>Cm.</label>
        </div>
        <div className="f-input">
          <label>Weight:</label>
          <br />
          <TextField
            required
            name="weight"
            label="Weight"
            type="number"
            {...register("weight", { required: true })}
          />
          <label>Kg.</label>
        </div>
        <div className="f-input">
          <label>Address:</label>
          <br />
          <TextField
            name="address"
            aria-label="minimum height"
            minRows={3}
            placeholder="Address"
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
            Confirm
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
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Cancel
            </Link>
          </Button>
        </div>
      </div>

      <div className="form-register-image">
        {/* <Button variant="contained" component="label" style={{
          backgroundColor: "#50A5B1",
          width: "100px",
          height: "30px",
        }}>
          Upload
          <input hidden type="file" multiple accept="image/*" onChange={onImageChange} />
        </Button>
        {imageURLs.map((imageSrc, idx) => (
          <img key={idx} width="240" height="260" src={imageSrc} />
        ))} */}
        <FileUpload key={value} value={value} setValue={setValue} />
      </div>
    </form>
  );
};

export default Register;
