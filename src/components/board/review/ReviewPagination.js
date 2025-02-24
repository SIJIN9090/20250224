import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Pagination from "react-js-pagination";

function ReviewPagination() {
  //BbsList
  const [bbsList, setBbsList] = useState([]);

  //검색용 Hook
  //게시글 조회
  const [choiceVal, setChoiceVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  //Paging
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const getBbsList = async (page) => {
    try {
      const response = await axios.get("http://localhost:8080/board/list", {
        params: { page: page - 1 },
      });

      console.log("[BbsList.js] useEffect() success :D");
      console.log(response.data);

      setBbsList(response.data.content);
      setPageSize(response.data.pageSize);
      setTotalPages(response.data.totalPages);
      setTotalCnt(response.data.totalElements); //★
    } catch (error) {
      console.log("[BbsList.js] useEffect() error :<");
      console.log(error);
    }
  };

  //페이징 보여주기
  const changePage = (page) => {
    setPage(page);
    getBbsList(page);
  };

  return (
    <Container>
      <PaginationBox>
        <Pagination
          className="pagination"
          activePage={page}
          itemsCountPerPage={pageSize}
          totalitemsCount={totalPages}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={changePage}
        />
      </PaginationBox>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//페이지네이션
const PaginationBox = styled.div`
  padding: 10px;

  margin-bottom: 40px;
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  width: 1000px;
  height: 50px;
  background-color: #ffffff;
  flex-direction: row;

  /* Pagination 스타일 */
  .pagination {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .pagination li {
    display: inline-block;
    margin: 0 5px;
  }
`;
export default ReviewPagination;
