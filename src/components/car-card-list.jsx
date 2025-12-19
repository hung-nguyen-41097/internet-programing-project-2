import { React, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import ToastNotification from './toast-notification';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaGasPump,
  FaBolt,
  FaSeedling,
  FaPowerOff,
  FaBurn,
} from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { setSelectedCar } from '../storeSlice';
import { useCarData, useCarFilters } from '../hooks/useCarData';

const CarCardList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchFilter = useSelector((state) => state.store.searchFilter);
  const searchValue = useSelector((state) => state.store.searchValue);

  const { data: cars, isLoading, error } = useCarData();
  const { filterBySearch } = useCarFilters(cars);

  const filteredCars = cars ? filterBySearch(searchValue, searchFilter) : [];

  const [toast, setToast] = useState({
    message: 'Car has been selected!',
    showToast: false,
    background: 'success',
  });

  const handleClickRentCar = (car) => {
    setToast({
      ...toast,
      showToast: true,
    });
    localStorage.setItem('selectedCar', JSON.stringify(car));
    dispatch(setSelectedCar(car));
    navigate('/reservation/' + car.vin_id);
  };

  if (isLoading) {
    return <div>Loading cars...</div>;
  }

  if (error) {
    return <div>Error loading cars: {error.message}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <div>
          <h2>Car rental Australia</h2>
          <p>
            Whether you're traveling for business or pleasure, a car is the most
            affordable mode of transport to get around Australia. Save time and
            costs with low overheads, great options, quick availability and easy
            booking management.
          </p>
        </div>
      </div>
      <Row xs={1} md={3} lg={3} className="g-3">
        {filteredCars.map((car) => (
          <Col
            key={`car-col-${car.vin_id}`}
            className="d-flex justify-content-center"
            md={4}
          >
            <Card
              key={car.vin_id}
              className="card-hover"
              style={{ width: '100%', height: '450px', position: 'relative' }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  display: 'flex',
                  gap: '5px',
                  zIndex: 2,
                }}
              >
                {car.is_hybrid === 1 && (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-hybrid">
                        This car is a Hybrid
                      </Tooltip>
                    }
                  >
                    <FaSeedling style={{ color: 'beige', fontSize: '20px' }} />
                  </OverlayTrigger>
                )}
                {car.is_diesel === 1 && (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-diesel">
                        This car uses Diesel
                      </Tooltip>
                    }
                  >
                    <FaBurn style={{ color: 'beige', fontSize: '20px' }} />
                  </OverlayTrigger>
                )}
                {car.is_petrol === 1 && (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-petrol">
                        This car uses Petrol
                      </Tooltip>
                    }
                  >
                    <FaGasPump style={{ color: 'beige', fontSize: '20px' }} />
                  </OverlayTrigger>
                )}
                {car.is_electric === 1 && (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-electric">
                        This car is Electric
                      </Tooltip>
                    }
                  >
                    <FaBolt style={{ color: 'beige', fontSize: '20px' }} />
                  </OverlayTrigger>
                )}
                {car.is_automatic === 1 && (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-automatic">
                        This car is Automatic
                      </Tooltip>
                    }
                  >
                    <FaPowerOff style={{ color: 'beige', fontSize: '20px' }} />
                  </OverlayTrigger>
                )}
              </div>
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Card.Img
                  variant="top"
                  src={car.image_url}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(60%)',
                  }}
                />
              </div>
              <Card.Body
                className="p-2 d-flex flex-column justify-content-between"
                style={{
                  position: 'relative',
                  textAlign: 'left',
                  color: 'white',
                }}
              >
                <div>
                  <Card.Title>{car.vehicle_category}</Card.Title>
                  <Card.Text>
                    <strong>Brand:</strong> {car.brand}
                    <br />
                    <strong>Model:</strong> {car.model}
                    <br />
                    <strong>Year:</strong> {car.year_of_manufacture}
                    <br />
                    <strong>Mileage:</strong> {car.mileage} km
                    <br />
                    <strong>Daily Rate:</strong> ${car.avg_rate}
                  </Card.Text>
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    size="sm"
                    onClick={() => handleClickRentCar(car)}
                    style={{
                      borderRadius: '20px',
                      backgroundColor: 'orange',
                      borderColor: 'orange',
                      alignSelf: 'end',
                      marginBottom: '10px',
                      padding: '5px 30px',
                      fontSize: '16px',
                      whiteSpace: 'nowrap',
                    }}
                    disabled={!car.availability}
                  >
                    Rent Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastNotification
        message={toast.message}
        showToast={toast.showToast}
        background={toast.background}
        position="bottom-end"
        onClose={() =>
          setToast({
            ...toast,
            showToast: false,
          })
        }
      />
    </div>
  );
};

export default CarCardList;
