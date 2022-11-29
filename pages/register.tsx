import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, FormikProps } from "formik";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { useAppDispatch } from "@/store/store";
import { signUp } from "@/store/slices/userSlice";
type Props = {};

const Register = ({}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
          autoComplete="email"
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
          Register
        </Button>
        <Button
          fullWidth
          size="small"
          color="primary"
          onClick={() => router.push("/login")}
        >
          Cancel
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
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values) => {
                const res = await dispatch(signUp(values));
                if (res.meta.requestStatus === "rejected") {
                  alert(res.payload);
                } else {
                  router.push("/login");
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

export default Register;
