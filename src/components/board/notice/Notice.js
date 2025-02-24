import React, { useState } from "react";
import styled from "styled-components";
import NoticeTable from "./NoticeTable";
import NoticePagination from "./NoticePagination";

function Notice() {
  return (
    <Container>
      <ContentWrapper>
        <NoticeTitle>
          <h1>공지사항</h1>
        </NoticeTitle>

        <NoticeTable />

        <PaginationBox>
          <NoticePagination />
        </PaginationBox>
      </ContentWrapper>
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

//  내부 콘텐츠
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//  공지사항 제목
const NoticeTitle = styled.div`
  width: 1000px;
  height: 50px;
  margin-top: 100px;
  text-align: left;
  h1 {
    font-weight: bold;
    font-size: 36px;
    font-family: "Noto Sans KR", serif;
  }
`;

const PaginationBox = styled.div``;

export default Notice;
