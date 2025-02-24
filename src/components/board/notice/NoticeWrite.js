import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function NoticeWrite({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Container>
      <ContentWrapper>
        <TableBox>
          <Table>
            <tbody>
              <tr>
                <td>
                  <TableTitle
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <UploadWrapper>
                  <FileInputWrapper>
                    <FileLabel htmlFor="fileInput">파일 선택</FileLabel>
                    <InputFile
                      id="fileInput"
                      type="file"
                      onChange={handleFileChange}
                    />
                    {file && <FileName>{file.name}</FileName>}
                  </FileInputWrapper>
                </UploadWrapper>
              </tr>
              <tr>
                <td>
                  <TableContent
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBox>
      </ContentWrapper>
    </Container>
  );
}

//  컨테이너
const Container = styled.div`
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
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

// 업로드 영역
const UploadWrapper = styled.div`
  margin-bottom: 10px;
`;

// 파일 업로드 영역 스타일
const FileInputWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 10px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 30%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// 파일 선택 버튼 스타일
const FileLabel = styled.label`
  font-size: 16px;
  color: #111111;
  cursor: pointer;

  padding: 10px 20px;
  border: 1px solid #111111;
  border-radius: 5px;
  background-color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f8f0;
  }
`;

// 파일 입력 스타일
const InputFile = styled.input`
  display: none;
`;

// 파일 이름 텍스트 스타일
const FileName = styled.div`
  font-size: 16px;
  color: #333;
  padding: 10px;
  font-weight: 500;
`;

//  테이블 박스
const TableBox = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// 테이블
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

//  입력 필드
const TableTitle = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #111111;
  font-size: 20px;
  font-weight: medium;
  font-family: "Noto Sans KR", serif;
  margin-bottom: 30px;

  outline: none;
`;

const TableContent = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 5px;
  border: none;
  font-size: 16px;
  font-weight: 300;
  font-family: "Noto Sans KR", serif;
  border: none;
  border-bottom: 1px solid #111111;
  outline: none;
  resize: none;
  overflow-x: hidden;
`;

export default NoticeWrite;
