import React, { useState } from "react";
import styled from "styled-components";

import ReservationCheck from "./ReservationCheck";
import UserProfile from "./UserProfile";
import UserUpdate from "./UserUpdate";



function MyPage() {
  const [page, setPage] = useState('1');

  return (
    <MyPageContainer>
      <MyPageTitle>
        <TitleH1>마이페이지</TitleH1>
      </MyPageTitle>

      <ButtonTable>
        <tbody>
          <TableRow>
            <TableCell><MyPageButton onClick={() => setPage('1')}>프로필</MyPageButton></TableCell>
            <TableCell><MyPageButton onClick={() => setPage('2')}>회원정보수정</MyPageButton></TableCell>
            <TableCell><MyPageButton onClick={() => setPage('3')}>예약확인</MyPageButton></TableCell>
          </TableRow>
        </tbody>
      </ButtonTable>

      <MyPageContentBox>
        {page === '1' && <UserProfile />}
        {page === '2' && <UserUpdate />}
        {page === '3' && <ReservationCheck />}
      </MyPageContentBox>
    </MyPageContainer>
  );
}


const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const MyPageTitle = styled.div`
  margin-top: 100px;
  text-align: left;
`;

const TitleH1 = styled.h1`
  margin-left: 0;
`;

const ButtonTable = styled.table`
  width: 100%;
  max-width: 1280px; /* 최대 너비를 설정 */
  text-align: center;
  table-layout: fixed; /* 고정된 레이아웃 */
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  width: 60px; /* td의 width를 60px로 설정 */
  padding: 0; /* 버튼 간격을 줄이기 위해 padding 제거 */
`;

const MyPageButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: white;
  border: 1px solid #ccc;
  cursor: pointer;
  padding: 0;
`;

const MyPageContentBox = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-bottom: 30px;
`;

export default MyPage;
