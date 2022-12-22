import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../Register/Register.css";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form className="boxs" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-register">
        <h1>Profile</h1>
        <div className="f-input">
          <label>Email:</label><br/>
          <TextField
            name="email"
            type="email"
            InputProps={{ readOnly: true }}
            {...register}
          />
        </div>
        <div className="f-input">
          <label>Fisrtname:</label><br/>
          <TextField
            name="fisrtname"
            InputProps={{ readOnly: true }}
            {...register}
          />
        </div>
        <div className="f-input">
          <label>Lastname:</label><br/>
          <TextField
            name="lastname"
            InputProps={{ readOnly: true }}
            {...register}
          />
        </div>
        <div className="f-input">
          <label>Displayname:</label><br/>
          <TextField
            name="displayname"
            InputProps={{ readOnly: true }}
            {...register}
          />
        </div>
        <div className="f-input">
          <label>Height:</label><br/>
          <TextField
            name="height"
            InputProps={{ readOnly: true }}
            {...register}
          />
          <label>Cm.</label>
        </div>
        <div className="f-input">
          <label>Weight:</label><br/>
          <TextField
            required
            name="weight"
            InputProps={{ readOnly: true }}
            {...register}
          />
          <label>Kg.</label>
        </div>
        <div className="f-input">
          <label>Address:</label><br/>
          <TextField
            multiline
            name="address"
            aria-label="minimum height"
            minRows={3}
            style={{ width: 200 }}
            InputProps={{ readOnly: true }}
            {...register}
          />
        </div>
        <div className="f-button">
          <Button
            style={{
              backgroundColor: "#C32B42",
              width: "100px",
              height: "30px",
            }}
          >
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "white" }}
            >
              Back
            </Link>
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#50A5B1",
              width: "100px",
              height: "30px",
            }}
          >
            <Link
              to="/editProfile"
              style={{ textDecoration: "none", color: "white" }}
            >
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="form-register-image">
        <img width="240" height="260" />
      </div>
    </form>
  );
};

export default Profile;
