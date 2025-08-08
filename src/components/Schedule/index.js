import "./index.css";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import MyContext from "../../context";
import { useContext } from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
};

const formatDay = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { weekday: "short" });
};

const convertTo12Hour = (time24) => {
  const [hour, minute] = time24.split(":").map(Number);

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // convert 0 to 12

  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
};

const Schedule = (props) => {
  const { bookings, insertBookings } = useContext(MyContext);
  const { available_dates, id, name } = props;
  const [state, setState] = useState({
    activeDate: available_dates[0].date,
    activeTime: null,
  });
  const activeDate = state.activeDate;
  const activeBtn = state.activeTime ? "active-btn" : "";

  const changeDate = (date) => () => {
    setState((prevState) => ({
      ...prevState,
      activeDate: date,
      activeTime: null,
    }));
  };

  const selectTime = (time) => () => {
    setState((prevState) => ({
      ...prevState,
      activeTime: time,
    }));
  };

  const formSubmit = (event, closeModal) => {
    const { activeDate, activeTime } = state;
    event.preventDefault();

    insertBookings((pState) => {
      const exists = pState.some((each) => each.id === id);
      return exists ? pState : [...pState, { id, activeDate, activeTime }];
    });
    closeModal();
  };

  const renderScheduleCard = () => (
    <>
      <div className="schedule-header">
        <strong>
          <p className="education-degree">Available sessions</p>
        </strong>
        <p className="book-sub-heading">Book 1:1 sessions from the options</p>
        <ul className="dates">
          {available_dates.map((each) => {
            const activeDateClass =
              activeDate === each.date ? "active-date" : "";
            return (
              <li key={each.date}>
                <button
                  className={`date ${activeDateClass}`}
                  onClick={changeDate(each.date)}
                >
                  <p className="day">{formatDay(each.date)}</p>
                  <p className="full-date">{formatDate(each.date)}</p>
                  <p className="time">{each.slots.length} slots</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="schedule-header">
        <strong>
          <p className="education-degree">Available time slots</p>
        </strong>
        <hr className="hr" />
        <ul className="times">
          {available_dates.map(
            (each) =>
              each.date === activeDate &&
              each.slots.map((item) => {
                const activeTimeClass =
                  state.activeTime === convertTo12Hour(item)
                    ? "active-time"
                    : "";
                return (
                  <li key={each.item}>
                    <button
                      className={`time-chip ${activeTimeClass}`}
                      onClick={selectTime(convertTo12Hour(item))}
                    >
                      <p className="time-text">{convertTo12Hour(item)}</p>
                    </button>
                  </li>
                );
              })
          )}
        </ul>
      </div>
      <div className="popup-container">
        <Popup
          modal
          overlayStyle={{ background: "rgba(0, 0, 0, 0.7)" }}
          trigger={
            <button
              className={`book-session-btn ${activeBtn}`}
              disabled={state.activeTime === null}
            >
              Book Session on {formatDate(activeDate)}
            </button>
          }
        >
          {(closeModal) => (
            <div className="popup">
              <div className="popup-title">
                <h2>Confirm Booking</h2>

                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => closeModal()}
                >
                  <IoIosClose />
                </button>
              </div>
              <div className="popup-date">
                <p className="popup-time">
                  Appointment on{" "}
                  <span className="popup-time-schedule">
                    {formatDate(state.activeDate)} {state.activeTime}
                  </span>
                </p>
              </div>
              <form onSubmit={(e) => formSubmit(e, closeModal)}>
                <div className="form-input">
                  <label className="popup-label">Name</label>
                  <input
                    type="text"
                    className="popup-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-input">
                  <label className="popup-label">Email</label>
                  <input
                    type="email"
                    className="popup-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-input">
                  <label className="popup-label">Message</label>
                  <textarea
                    className="popup-input"
                    placeholder="Enter your message"
                    rows="4"
                  ></textarea>
                </div>
                <button className="book-session-btn active-btn" type="submit">
                  Book Session
                </button>
              </form>
            </div>
          )}
        </Popup>
      </div>
    </>
  );

  const renderSuccessView = () => {
    const booking = bookings.filter((each)=>each.id===id)[0]
    return (
      <div className="success-view">
        <FaCheckCircle className="check" />
        <h3>Congratulations</h3>
        <p className="success-message">
          <span className="light">You have an upcoming oppointment with </span>{" "}
          <br />
          <strong>{name}</strong> on <strong>{formatDate(booking.activeDate)}</strong> at{" "}
          <strong>{booking.activeTime}</strong>
        </p>
      </div>
    );
  };

  const renderSchedule = () => {
    switch (true) {
      case bookings.some(each=>each.id===id):
        return renderSuccessView();
      default:
        return renderScheduleCard();
    }
  };

  return <div className="schedule">{renderSchedule()}</div>;
};

export default Schedule;
