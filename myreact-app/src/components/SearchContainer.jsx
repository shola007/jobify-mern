import { Form, Link, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { useAlljobsContext } from "../pages/Alljobs";

const SearchContainer = () => {
  const { searchValues } = useAlljobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();

  const Debounce = (onChange) => {
    let timeout;
    return (e) => {
      let form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            labelText="search"
            onChange={Debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={jobStatus}
            list={["all", ...Object.values(JOB_STATUS)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={jobType}
            list={["all", ...Object.values(JOB_TYPE)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name="sort"
            labelText="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link to="/dashboard/alljobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
