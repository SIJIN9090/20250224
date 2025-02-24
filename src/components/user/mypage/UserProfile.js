import React from "react";
import styled from "styled-components";


function UserProfile() {
  return (
    <ProfileContainer>
      <ProfileUserBox>
        <ProfileUserTable>
          <thead>
            <tr>
              <th colSpan="2">회원 정보</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>이름</th>
              <td>김김김</td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>믹믹믹</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>우리집</td>
            </tr>
            <tr>
              <th>휴대폰번호</th>
              <td>000-0000-0000</td>
            </tr>
          </tbody>
        </ProfileUserTable>
      </ProfileUserBox>

      <ProfileAnimalBox>
        <ProfileAnimalTable>
          <thead>
            <tr>
              <th colSpan="2">반려동물 정보</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>이름</th>
              <td>김김김</td>
            </tr>
            <tr>
              <th>종류</th>
              <td>고양이</td>
            </tr>
            <tr>
              <th>나이</th>
              <td>11</td>
            </tr>
            <tr>
              <th>무게</th>
              <td>5.2</td>
            </tr>
          </tbody>
        </ProfileAnimalTable>
      </ProfileAnimalBox>
    </ProfileContainer>
  );
}


const ProfileContainer = styled.div`
  width: 100%;
  max-width: 1920px; /* 최대 너비 1920px */
  height: 600px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const ProfileUserBox = styled.div`
  width: 100%;
  max-width: 1280px; /* 최대 너비 1280px */
  height: 200px;
  margin-top: 20px;
margin-left: 20%;
  paddig 
`;

const ProfileUserTable = styled.table`
  width: 80%;
  border: 1px solid black;
  text-align: left;
  border-collapse: collapse;
`;

const ProfileAnimalBox = styled.div`
  width: 100%;
  max-width: 1280px; /* 최대 너비 1280px */
  height: 200px;

margin-left: 20%;

  margin-top: 20px;

  
`;

const ProfileAnimalTable = styled.table`
  width: 80%;
  border: 1px solid black;
  text-align: left;
  border-collapse: collapse;
`;


export default UserProfile;
