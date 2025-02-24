import React, { useState } from "react";
import styled from "styled-components";

import search from "./imgs/search.png";

function NoticeTable() {
  const notices = [
    { id: 1, title: "제목", date: "2025-02-20", views: 11 },
    { id: 2, title: "제목", date: "2025-02-20", views: 10 },
    { id: 3, title: "제목", date: "2025-02-20", views: 10 },
    { id: 4, title: "제목", date: "2025-02-20", views: 10 },
    { id: 5, title: "제목", date: "2025-02-20", views: 10 },
    { id: 6, title: "제목", date: "2025-02-20", views: 11 },
    { id: 7, title: "제목", date: "2025-02-20", views: 10 },
    { id: 8, title: "제목", date: "2025-02-20", views: 10 },
  ];
  const addEmptyRows = (data) => {
    const rowsWithEmpty = [];
    data.forEach((item, index) => {
      rowsWithEmpty.push({}); // 데이터 행 추가
      rowsWithEmpty.push(item); // 빈 데이터 행 추가 (공백 행)
    });
    return rowsWithEmpty;
  };
  const noticesWithEmptyRows = addEmptyRows(notices);

  return (
    <Container>
      <NoticeSearchBox>
        <img src={search} />
        <SearchField type="text" placeholder="검색 할 것을 적어보세요." />
      </NoticeSearchBox>

      <NoticeTableBox>
        <NoticeTabled>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>등록일</th>
              <th>조회수</th>
            </tr>
          </thead>

          <tbody>
            {noticesWithEmptyRows.map((notice, index) => (
              <tr key={index}>
                {notice.id ? (
                  // 데이터가 있을 때
                  <>
                    <td>{notice.id}</td>
                    <td>{notice.title}</td>
                    <td>{notice.date}</td>
                    <td>{notice.views}</td>
                  </>
                ) : (
                  // 빈 데이터 행일 때 (공백 행)
                  <>
                    <td colSpan={4}>&nbsp;</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </NoticeTabled>
      </NoticeTableBox>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  width:100%
  max-width: 1920px;
`;

//  검색 박스
const NoticeSearchBox = styled.div`
  display: flex;
  width: 1280px;
  height: 90px;
  justify-content: center;
  position: relative;
  img {
    position: absolute;
    left: 180px;
    top: 35px;
    width: 30px;
    height: 30px;
  }
  input {
    padding-left: 50px;
    padding-bottom: 10px;
  }
  input:focus {
    outline: none;
  }
`;

//  검색 필드 스타일
const SearchField = styled.input`
  margin-top: 25px;
  width: 920px;
  height: 55px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-weight: regular;
  font-size: 36px;
  font-family: "Noto Sans KR", serif;
`;

//  공지사항 테이블 박스
const NoticeTableBox = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding-left: 140px;
  padding-right: 140px;
`;

//  공지사항 테이블
const NoticeTabled = styled.table`
  width: 100%;
  
  border-collapse: collapse;
  

  thead {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  thead th {
    padding: 10px;
    font-weight: medium;
    font-size: 20px;
    font-family: "Noto Sans KR", serif;
  }

  tbody tr {
    &:nth-child(odd) {
      border: none;
      height: 40px;
    }
    &:nth-child(even) {
      background-color: #f4f4f4;
      border-bottom: 1px solid #111111;
      height: 70px;
    }
    width: 1280px;
  }

  tbody td {
    padding: 10px;
    font-weight: regular;
    font-size: 20px;
    font-family: "Noto Sans KR", serif;
    vertical-align: middle;
  &:nth-of-type(1) {  /* 첫 번째 <td> */
    width: 80px;
    text-align: center;
  }

  &:nth-of-type(2) {  /* 두 번째 <td> */
    width: 920px;
    text-align: center;
  }

  &:nth-of-type(3) {  /* 세 번째 <td> */
    width: 180px;
    text-align: center;
  }

  &:nth-of-type(4) {  /* 네 번째 <td> */
    width: 100px;
    text-align: center;
  }
`;

export default NoticeTable;
