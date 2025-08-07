import "./index.css";
import {useState } from "react";

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
  });
  const activeDate = state.activeDate;

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
              <li className={`date ${activeDateClass}`} key={each.date}>
                <p className="day">{formatDay(each.date)}</p>
                {formatDate(each.date)}
                <p className="time">{each.slots.length} slots</p>
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
          {available_dates.map((each) => each.date === activeDate &&
            each.slots.map((item) => (
              <li className="time-chip" key={each.item}>
                <p className="time-text">{convertTo12Hour(item)}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Schedule;
