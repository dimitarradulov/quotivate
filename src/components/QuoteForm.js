import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { sendQuote } from '../store/quote-slice';
import { quoteActions } from '../store/quote-slice';

const QuoteForm = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.quote.notification);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      author: '',
      text: '',
    },
    validationSchema: Yup.object({
      author: Yup.string()
        .min(2, 'Must be at least 2 characters!')
        .required('This field is required!'),
      text: Yup.string()
        .min(20, 'Must be at least 20 characters!')
        .required('This field is required!'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(sendQuote(values));
      dispatch(quoteActions.notificationAlertToggler({ type: 'open' }));
      resetForm();
    },
  });

  useEffect(() => {
    if (notification.status === 'success') {
      history.push('/quotes/all');
    }
  }, [notification, history]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        id="standard-basic"
        name="author"
        label="Author"
        variant="standard"
        placeholder="The author of the quote..."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.author}
        error={Boolean(formik.touched.author && formik.errors.author)}
        helperText={formik.errors.author}
      />
      <TextField
        id="standard-textarea"
        name="text"
        label="Text"
        minRows={7}
        placeholder="Type your quote..."
        multiline
        variant="standard"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.text}
        error={Boolean(formik.touched.text && formik.errors.text)}
        helperText={formik.errors.text}
      />

      {notification?.status !== 'pending' && (
        <Button type="submit" variant="contained" size="medium">
          Add Quote
        </Button>
      )}

      {notification?.status === 'pending' && (
        <Button type="submit" variant="contained" size="medium">
          Sending...
        </Button>
      )}
    </Box>
  );
};

export default QuoteForm;
