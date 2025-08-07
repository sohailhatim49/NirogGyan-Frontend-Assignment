import "./index.css";
import { useState } from "react";

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
  const { available_dates } = props;
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

  return (
    <div className="schedule">
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
                  state.activeTime === item ? "active-time" : "";
                return (
                  <li key={each.item}>
                    <button
                      className={`time-chip ${activeTimeClass}`}
                      onClick={selectTime(item)}
                    >
                      <p className="time-text">{convertTo12Hour(item)}</p>
                    </button>
                  </li>
                );
              })
          )}
        </ul>
      </div>
      <button className={`book-session-btn ${activeBtn}`}>
        Book Session on {formatDate(activeDate)}
      </button>
    </div>
  );
};

export default Schedule;
