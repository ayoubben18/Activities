import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import ValidationError from "../errors/ValidationError";

const RegisterForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required("Display Name is required"),
        username: Yup.string().required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().min(8).required("Password is required"),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header color="teal" content="Register" as="h2" textAlign="center" />
          <MyTextInput placeholder="Display Name" name="displayName" />
          <MyTextInput placeholder="Username" name="username" />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <ValidationError errors={errors.error as unknown as string[]} />
            )}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);
