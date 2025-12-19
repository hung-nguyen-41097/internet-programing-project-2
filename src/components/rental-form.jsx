import React, { useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { setSelectedCar } from '../storeSlice';
import { useDispatch } from 'react-redux';
import ToastNotification from './toast-notification';
import { useUpdateCarAvailability } from '../hooks/useCarData';

const RentalForm = ({ selectedCar, setRentalToast }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateCarAvailability = useUpdateCarAvailability();

  const [initialFormData, setInitialFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    license: '',
    startDate: '',
    rentalDays: '',
  });

  useEffect(() => {
    const localFormData = localStorage.getItem('rentalForm');
    if (localFormData) {
      setInitialFormData(JSON.parse(localFormData));
    }
  }, []);

  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      license: Yup.string()
        .matches(
          /^[A-Z0-9]{6,10}$/,
          'License must be 6-10 characters of uppercase letters and numbers'
        )
        .required('License number is required'),
      startDate: Yup.date()
        .min(new Date(), 'Start date must be in the future')
        .required('Start date is required'),
      rentalDays: Yup.number()
        .min(1, 'Minimum rental period is 1 day')
        .max(30, 'Maximum rental period is 30 days')
        .required('Rental days is required'),
    }),
    onSubmit: async (values) => {
      try {
        await updateCarAvailability.mutateAsync({
          vinId: selectedCar.vin_id,
          availability: 0,
        });

        setRentalToast({
          show: true,
          message:
            'Rental form submitted successfully! Coming back to the home page...',
          background: 'success',
        });

        localStorage.removeItem('selectedCar');
        dispatch(setSelectedCar(null));

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        setRentalToast({
          show: true,
          message: 'Error: ' + error.message,
          background: 'danger',
        });
      }
    },
  });

  useEffect(() => {
    localStorage.setItem('rentalForm', JSON.stringify(formik.values));
  }, [formik.values]);

  const handleClickCancel = () => {
    setRentalToast({
      show: true,
      message: 'Data is cleared! Coming back to the home page...',
    });

    formik.resetForm();
    localStorage.clear();
    dispatch(setSelectedCar(null));

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.phone && formik.errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.email && formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>License Number</Form.Label>
        <Form.Control
          type="text"
          name="license"
          value={formik.values.license}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.license && formik.errors.license}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.license}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.startDate && formik.errors.startDate}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.startDate}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rental Days</Form.Label>
        <Form.Control
          type="number"
          name="rentalDays"
          value={formik.values.rentalDays}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.rentalDays && formik.errors.rentalDays}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.rentalDays}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleClickCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default RentalForm;
