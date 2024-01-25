import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
interface Props {
  setEditMode: (editMode: boolean) => void;
}
const ProfileEditForm = ({ setEditMode }: Props) => {
  const {
    profileStore: { profile, update },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => update(values).then(() => setEditMode(false))}
      validationSchema={Yup.object({ displayName: Yup.string().required() })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput placeholder="Display Name" name="displayName" />
          <MyTextArea rows={3} placeholder="Bio" name="bio" />
          <Button
            positive
            type="submit"
            loading={isSubmitting}
            content="Update Profile"
            floated="right"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(ProfileEditForm);
