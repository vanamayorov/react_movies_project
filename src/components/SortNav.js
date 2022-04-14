import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage, firstPage, getSortBy, getPage, setSortBy } from "../reducers/sortBarReducerSlice";
import { getPages } from "../reducers/sortBarReducerSlice";

const SortNav = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector(getSortBy);
    const pages = useSelector(getPages);
    const page = useSelector(getPage);

    const getClassName = value => {
        return `nav-link${value === sortBy ? " active" : ""}`;
    }

    const handleClick = value => {
        localStorage.setItem("sort", value);
        dispatch(setSortBy(value));
    }

    const pageNext = () => {
        localStorage.setItem("page", page + 1);
        dispatch(nextPage());
    }

    const pagePrev = () => {
        localStorage.setItem("page", page + 1);
        dispatch(prevPage());
    }

    const pageFirst = () => {
        localStorage.setItem("page", 1);
        dispatch(firstPage());
    }

    return (
        <div className="row">
            <div className="d-flex align-items-center mt-3">
                <div>
                    <button type="button" className={`btn btn-secondary ${page === 1 ? "disabled" : ""}`} onClick={pageFirst}>First Page</button>
                </div>
                <div>
                    <button type="button" className={`btn mx-3 btn-primary ${page === 1 ? "disabled" : ""}`} onClick={pagePrev}>Previous</button>
                </div>
                <div className="d-flex align-items-center">
                    <p className="mx-3 pt-2">Current Page: {page}</p>
                </div>
                <div className="ml-4">
                    <button type="button" className={`btn btn-primary mx-3 ${page === pages ? "disabled" : ""}`} onClick={pageNext}>Next</button>
                </div>
                <p className="pt-2">Total Pages: {pages} </p>
            </div>
            <ul className="tabs nav nav-pills mt-3 ps-2">
                <li className="nav-item">
                    <button className={getClassName("popularity.desc")} onClick={() => handleClick("popularity.desc")}>Popularity</button>
                </li>
                <li className="nav-item">
                    <button className={getClassName("revenue.desc")} onClick={() => handleClick("revenue.desc")}>Revenue</button>
                </li>
                <li className="nav-item">
                    <button className={getClassName("vote_average.desc")} onClick={() => handleClick("vote_average.desc")}>Vote average</button>
                </li>
            </ul>
        </div>
    );
}

export default SortNav;