import React from "react";
import styled from "styled-components";



function ReservationCheck() {
    return (
        <ReservCheckContainer>
            <ReservCheckTableBox>
                <ReservCheckTable>
                    <thead>
                        <tr>
                            <TableHeader>예약번호</TableHeader>
                            <TableHeader>진료과</TableHeader>
                            <TableHeader>날짜</TableHeader>
                            <TableHeader>시간</TableHeader>
                            <TableHeader>반려동물이름</TableHeader>
                            <TableHeader>생성시간</TableHeader>
                            <TableHeader>예약삭제</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 데이터 */}
                    </tbody>
                </ReservCheckTable>
            </ReservCheckTableBox>
        </ReservCheckContainer>
    );
}


const ReservCheckContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 600px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const ReservCheckTableBox = styled.div`
  width: 80%;
  max-width: 1280px;
`;

const ReservCheckTable = styled.table`
  border: 1px solid black;
  width: 100%;
  height: 400px;
  border-radius: 15px;
  text-align: center;
  table-layout: fixed;
`;

const TableHeader = styled.th`
  padding: 10px;
`;

export default ReservationCheck;
