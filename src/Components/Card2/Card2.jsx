import Card1 from "../Card";
import React, { useEffect } from "react";
import "../../App.css";
import { getUser } from "../../Users/user";
import { fetchUsers } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

function Card2({ search }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [pageNo, setPageNo] = React.useState(0);
  const perPage = 12;
  const pagesVisit = pageNo * perPage;
  const pageCount = Math.ceil(state.users.length / perPage);

  useEffect(() => {
    getUser().then((users) => {
      console.log(users);
      dispatch(fetchUsers(users));
    });
  }, [dispatch]);

  const changePage = ({ selected }) => {
    setPageNo(selected);
  };
  const display = state.users
    .filter((a) => {
      if (search == " ") {
        return a;
      } else if (a.name.fname.toLowerCase().includes(search.toLowerCase())) {
        return a;
      } else if (a.name.lname.toLowerCase().includes(search.toLowerCase())) {
        return a;
      } else if (a.contact.toString().includes(search.toString())) {
        return a;
      }
    })
    .slice(pagesVisit, pagesVisit + perPage)
    .map((user) => {
      return (
        <>
          <Card1
            key={user.imageUrl}
            fname={user.name.fname}
            lname={user.name.lname}
            contact={user.contact}
            imageUrl={user.imageUrl}
          />{" "}
        </>
      );
    });
  return (
    <>
      {display}
      <div id="react-paginate" className="page">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
export default Card2;
