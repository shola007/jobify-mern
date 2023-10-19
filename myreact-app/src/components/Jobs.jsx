import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import day from "dayjs";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Jobs = ({
  _id,
  position,
  company,
  jobStatus,
  jobType,
  createdAt,
  jobLocation,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className="actions">
          <Link to={`/dashboard/editjob/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`/dashboard/deletejob/${_id}`}>
            <button type="submit" className="btn delete-btn">
              delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Jobs;
