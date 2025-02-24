import React from "react";
import styled from "styled-components";
import AnimalProfile from "./AnimalProfile";


function UserUpdate() {
  return (
    <UserUpdateContainer>
      <UserUpdateUserBox>
        <UserUpdateUserTable>
          <thead>
            <tr>
              <th colSpan="2">회원정보수정</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>이름</th>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <th>이메일</th>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td><input type="password" /></td>
            </tr>
            <tr>
              <th>비밀번호확인</th>
              <td><input type="password" /></td>
            </tr>
            <tr>
              <th></th>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td><input type="text" /></td>
              <td><button type="button">중복확인</button></td>
            </tr>
            <tr>
              <th>주소</th>
              <td><input type="text" /></td>
              <td><button type="button">검색</button></td>
            </tr>
            <tr>
              <th>상세주소</th>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <th>핸드폰번호</th>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </UserUpdateUserTable>
      </UserUpdateUserBox>

      <UserUpdateAnimalBox>
        <AnimalProfile />
      </UserUpdateAnimalBox>

      <UserUpdateButtonBox>
        <UserUpdateButton type="button">수정</UserUpdateButton>
        <UserUpdateButton type="button">취소</UserUpdateButton>
      </UserUpdateButtonBox>
    </UserUpdateContainer>
  );
}


const UserUpdateContainer = styled.div`
  width: 100%;
  max-width: 1920px; /* 최대 너비 1920px */
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserUpdateUserBox = styled.div`
  width: 100%;
  max-width: 1280px; /* 최대 너비 1280px */
  margin-top: 20px;
  margin-bottom: 20px;
    display: flex;
  justify-content: center;  /* 수평 중앙 */
  align-items: center;      /* 수직 중앙 */
`;

const UserUpdateUserTable = styled.table`
  width: 60%;
  border: 1px solid black;
  text-align: left;
  border-collapse: collapse;
`;

const UserUpdateAnimalBox = styled.div`
  width: 100%;
  max-width: 1280px; /* 최대 너비 1280px */
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;  /* 수평 중앙 */
  align-items: center;      /* 수직 중앙 */
`;

const UserUpdateButtonBox = styled.div`
  width: 100%;
  max-width: 1280px; /* 최대 너비 1280px */
  display: flex;
  justify-content: center;  /* 버튼들을 중앙에 배치 */
  gap: 20px;  /* 버튼 간격 조정 */
  margin-top: 20px;
`;

const UserUpdateButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;


export default UserUpdate;
