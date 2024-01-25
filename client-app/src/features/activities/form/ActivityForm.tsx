import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;
  //if there is an id of an activity passed we open to edit not to add

  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.string().required("Date is required"),
    city: Yup.string().required("City is required"),
    venue: Yup.string().required("Venue is required"),
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) =>
        setActivity(new ActivityFormValues(activity))
      );
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: ActivityFormValues) => {
    if (!activity.id) {
      activity.id = uuidv4();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) return <LoadingComponent />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Title" name="title" />

            <MyTextArea rows={4} placeholder="Description" name="description" />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              showTimeSelect
              timeCaption="time"
              placeholderText="Date"
              name="date"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Activity Location" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              floated="right"
              positive
              type="submit"
              content="Submit"
              loading={isSubmitting}
              disabled={isSubmitting || !dirty || !isValid}
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              as={Link}
              to="/activities"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
