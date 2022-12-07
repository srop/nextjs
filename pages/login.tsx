import React, { ReactElement } from "react";

import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, FormikProps } from "formik";
import Router, { useRouter } from "next/router";
import { Box } from "@mui/material";
import { useAppDispatch } from "@/store/store";
import { signIn,getProfile } from "@/store/slices/userSlice";
import withAuth from "@/components/withAuth"
type Props = {};
const Login = ({}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();


  const showForm = ({
    values,
    setFieldValue,
    isValid,
    dirty,
    handleSubmit,
  }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          component={TextField}
          name="username"
          id="username"
          margin="normal"
          required
          fullWidth
        
          label="Username"
          autoComplete="username"
          autoFocus
        />
        <Field
          component={TextField}
          name="password"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
        
          autoComplete="current-password"
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
        <Button
          fullWidth
          size="small"
          color="primary"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
      </Form>
    );
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="/static/img/next_register.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Formik
              initialValues={{ username: "kminchelle", password: "0lelplR" }}
              onSubmit={async (values) => {
                const response = await dispatch(signIn(values));

                console.log("page login :",response)
                if (response.meta.requestStatus === "rejected") {
                  alert("Login failed");
                } else {
                  dispatch(getProfile());
                  router.push("/home");
                }
              }}
            >
              {(props) => showForm(props)}
            </Formik>
          </CardContent>
        </Card>

        <style jsx global>
          {`
            body {
              min-height: 100vh;
              position: relative;
              margin: 0;
              background-size: cover;
              background-image: url("/static/img/bg.png");
              text-align: center;
            }
          `}
        </style>
      </Box>
    </React.Fragment>
  );
};

export default (Login);
