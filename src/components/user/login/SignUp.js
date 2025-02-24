import React, { useState } from "react";
import styled from "styled-components";
import {
  idDuplicateCheck,
  nicknameDuplicateCheck,
  sendVerificationCode,
} from "./mail";
import logo_b from "./imgs/logo_b.png";
import { sendVerificationEmail } from "./mail"; // 수정된 import

function SignUp() {
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(false);

  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [forms, setForms] = useState([
    { id: Date.now(), petName: "", species: "", age: "" },
  ]);

  const handleVerification = async () => {
    if (!isIdAvailable) {
      setIdError("이메일 중복 확인을 먼저 진행해주세요.");
      return;
    }
    if (!id) {
      setIdError("이메일을 입력해주세요.");
      return;
    }

    try {
      await sendVerificationEmail(id); // 인증 코드 전송
      alert("인증 코드가 이메일로 전송되었습니다.");
    } catch (error) {
      setIdError("인증 코드 전송에 실패했습니다.");
    }
  };

  const handleIdChange = (e) => {
    const idValue = e.target.value;
    setId(idValue);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!idValue) {
      setIdError("이메일을 입력해주세요.");
    } else if (!emailRegex.test(idValue)) {
      setIdError("올바른 이메일 형식이 아닙니다.");
    } else {
      setIdError(""); // 유효한 이메일 형식이면 오류 메시지 제거
    }
    setIsIdAvailable(false); // 이메일 확인 버튼을 클릭하기 전 이메일을 재검토
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameError("");
    setIsNicknameAvailable(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("비밀번호는 8자리 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // 비밀번호와 확인 비밀번호를 비교하여 오류 메시지를 설정
    if (password !== value) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError(""); // 비밀번호가 일치하면 오류 메시지 제거
    }
  };

  const handleIdCheck = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!id) {
      setIdError("이메일을 입력해주세요.");
    }
    if (!emailRegex.test(id)) {
      setIdError("올바른 이메일 형식이 아닙니다.");
    }

    try {
      const available = await idDuplicateCheck(id);
      if (available) {
        setIdError("사용 가능한 이메일입니다.");
        setIsIdAvailable(true);
      } else {
        setIdError("이미 사용 중인 이메일입니다.");
        setIsIdAvailable(false);
      }
    } catch (error) {
      setIdError("서버 오류가 발생했습니다.");
    }
  };

  const handleNicknameCheck = async () => {
    if (!nickname) {
      setNicknameError("닉네임을 입력해주세요.");
      return;
    }

    try {
      const available = await nicknameDuplicateCheck(nickname);
      if (available) {
        setNicknameError("사용 가능한 닉네임입니다.");
        setIsNicknameAvailable(true);
      } else {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setIsNicknameAvailable(false);
      }
    } catch (error) {
      setNicknameError("서버 오류가 발생했습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인 오류가 있는지 체크
    if (password !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 나머지 유효성 검사와 제출 로직
    if (
      !isIdAvailable ||
      !isNicknameAvailable ||
      passwordError ||
      confirmError
    ) {
      alert("모든 항목을 올바르게 입력해주세요.");
      return;
    }

    alert("회원가입 성공!");
  };

  const addForm = () => {
    setForms([
      ...forms,
      { id: Date.now(), petName: "", species: "", age: "", weight: "" },
    ]);
  };

  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const handlePetInfoChange = (e, id, field) => {
    const value = e.target.value;
    setForms(
      forms.map((form) => (form.id === id ? { ...form, [field]: value } : form))
    );
  };
  return (
    <SignupContainer>
      <SignupSection>
        <SignupLogo>
          <img src={logo_b} />
        </SignupLogo>

        <SignupTitle>
          <h1>회원가입</h1>
        </SignupTitle>

        <MailBox>
          <table onSubmit={handleSubmit}>
            <tr></tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={id}
                  onChange={handleIdChange}
                  placeholder="이메일"
                />
                <button type="button" onClick={handleIdCheck}>
                  인증
                </button>
              </td>
            </tr>

            <tr>
              <td>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="인증 코드"
                />
                <button type="button" onClick={handleVerification}>
                  확인
                </button>
              </td>
            </tr>
            <tr>
              <td className="idError">
                {idError && (
                  <small className={isIdAvailable ? "idAvailable" : ""}>
                    {idError}
                  </small>
                )}
              </td>
            </tr>
          </table>
        </MailBox>

        <PwBox>
          <table>
            <tr>
              <td>
                <input
                  onChange={handlePasswordChange}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="비밀번호 "
                  theme="underLine"
                  maxLength={16}
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  onChange={handleConfirmPasswordChange}
                  type="password"
                  id="confirm"
                  name="confirm"
                  value={confirmPassword}
                  placeholder="비밀번호 확인"
                  theme="underLine"
                  maxLength={16}
                />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <td>
                  {passwordError && <small>{passwordError}</small>}
                  {confirmError && <small>{confirmError}</small>}{" "}
                </td>
              </td>
            </tr>
          </table>
        </PwBox>

        <NickBox>
          <table>
            <tr>
              <td>
                {" "}
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="닉네임을 입력하세요"
                />
                <button type="button" onClick={handleNicknameCheck}>
                  확인
                </button>
              </td>
            </tr>
            <tr>
              <td className="idError">
                {nicknameError && <small>{nicknameError}</small>}
              </td>
            </tr>
          </table>
        </NickBox>
        <OtherBox>
          <table>
            <tr>
              <td>
                <input type="text" placeholder="이름" />
              </td>
            </tr>
            <tr>
              {" "}
              <td>
                <input type="text" placeholder="주소" />
                <button>검색</button>
              </td>
            </tr>
            <tr>
              {" "}
              <td>
                {" "}
                <input type="text" placeholder="상세주소" />
              </td>
            </tr>

            <tr>
              <td>
                <input type="text" placeholder="생년월일" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" placeholder="전화번호" />
              </td>
            </tr>
          </table>
        </OtherBox>
        <AnimalBox>
          <table>
            <tr>
              <td>
                {" "}
                <AnimalBoxButton>
                  <button onClick={addForm}>추가</button>
                </AnimalBoxButton>{" "}
              </td>{" "}
            </tr>
          </table>
          {forms.map((form) => (
            <Formtable key={form.id}>
              <tr>
                <td>
                  <AnimalH1>
                    <h1>반려동물정보</h1>
                  </AnimalH1>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="동물이름"
                    value={form.petName}
                    onChange={(e) => handlePetInfoChange(e, form.id, "petName")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="동물종류"
                    value={form.species}
                    onChange={(e) => handlePetInfoChange(e, form.id, "species")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="동물나이"
                    value={form.age}
                    onChange={(e) => handlePetInfoChange(e, form.id, "age")}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <AnimalBoxButton>
                    <button danger onClick={() => removeForm(form.id)}>
                      삭제
                    </button>
                  </AnimalBoxButton>{" "}
                </td>{" "}
              </tr>
            </Formtable>
          ))}
        </AnimalBox>
        <SignupSectionE>
          <button type="submit">회원가입</button>
          {/* {setOpenModal ? openModal && <SignupModal /> : null} */}
        </SignupSectionE>
      </SignupSection>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  width: 1920px;
  height: 100%;
  min-height: 1340px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupSection = styled.div`
  margin: auto;
  align-items: center;
  margin-top: 130px;
  padding-top: 30px;
  width: 600px;
  min-height: 1074px;
  background-color: #f4f4f4;
  margin-bottom: 100px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;
// -------------------------------------------------------------------
const SignupLogo = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  width: 600px;
  height: 40px;
  background-color: #f4f4f4;
  margin-bottom: 30px;
  img {
    width: 145px;
    height: 35px;
  }
`;

const SignupTitle = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 600px;
  height: 40px;
  margin-bottom: 30px;
  h1 {
    font-size: 36px;
    color: #111111;
    font-weight: bold;
  }
`;

// -----------------------------------------------------------------
const MailBox = styled.div`
  width: 600px;

  align-items: center;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  background-color: #f4f4f4;

  td {
    position: relative;
  }

  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    font-weight: 300;
    margin-bottom: 2px;
    border: none;
    padding-left: 20px;
    font-size: 20px;
    width: 460px;
    height: 60px;
  }
  button {
    width: 50px;
    height: 26px;
    background-color: #f4f4f4;
    font-weight: 500;
    position: absolute;
    top: 14px;
    right: 14px;
    font-size: 20px;
  }
  .idError {
    padding-top: 8px;
    width: 460px;
    height: 20px;
  }
  small {
    padding-left: 10px;
    font-size: 12px;
  }
`;
// ------------------------------------------------------------------------
const PwBox = styled.div`
  width: 600px;

  align-items: center;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  background-color: #f4f4f4;

  td {
    position: relative;
  }

  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    font-weight: 300;
    margin-bottom: 2px;
    border: none;
    padding-left: 20px;
    font-size: 20px;
    width: 460px;
    height: 60px;
  }
  button {
    width: 50px;
    height: 26px;
    background-color: #f4f4f4;
    font-weight: 500;
    position: absolute;
    top: 14px;
    right: 14px;
    font-size: 20px;
  }
  .idError {
    padding-top: 8px;
    width: 460px;
    height: 20px;
  }
  small {
    padding-left: 10px;
    font-size: 12px;
  }
`;
// ------------------------------------------------------------------------

const NickBox = styled.div`
  width: 600px;
  align-items: center;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  background-color: #f4f4f4;

  td {
    position: relative;
  }

  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    font-weight: 300;
    margin-bottom: 2px;
    border: none;
    padding-left: 20px;
    font-size: 20px;
    width: 460px;
    height: 60px;
  }
  button {
    width: 50px;
    height: 26px;
    background-color: #f4f4f4;
    font-weight: 500;
    position: absolute;
    top: 14px;
    right: 14px;
    font-size: 20px;
  }
  .idError {
    padding-top: 8px;
    width: 460px;
    height: 20px;
  }
  small {
    padding-left: 10px;
    font-size: 12px;
  }
`;
// ------------------------------------------------------------------------
const OtherBox = styled.div`
  width: 600px;
  align-items: center;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  background-color: #f4f4f4;

  td {
    position: relative;
  }

  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    font-weight: 300;
    margin-bottom: 2px;
    border: none;
    padding-left: 20px;
    font-size: 20px;
    width: 460px;
    height: 60px;
  }
  button {
    width: 50px;
    height: 26px;
    background-color: #f4f4f4;
    font-weight: 500;
    position: absolute;
    top: 14px;
    right: 14px;
    font-size: 20px;
  }
`;
// -----------------------------------------------------------------
const AnimalBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #f4f4f4;

  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  justify-content: center;
`;

const AnimalBoxButton = styled.div`
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  button {
    font-size: 18px;
    background-color: #ffffff;
    padding: 10px 20px;
    border: 1px solid #ccc;
    cursor: pointer;
    margin: 5px;
  }
`;

const AnimalH1 = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 28px;
    font-weight: 700;
  }
`;

const Formtable = styled.table`
  width: 100%;
  max-width: 800px;
  background-color: #f4f4f4;
  margin: 10px auto;
  border-collapse: collapse;

  td {
    padding: 2px;
    text-align: center;
    vertical-align: middle;
  }

  input {
    font-family: "Noto Sans KR", serif;
    outline: none;
    width: 100%;
    max-width: 460px;
    height: 60px;
    border: none;
    font-size: 16px;
    padding-left: 20px;
  }
`;

// ----------------------------------------------------------
const SignupSectionE = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 600px;
  height: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
  button {
    font-size: 20px;
    font-weight: 700;
    width: 460px;
    height: 60px;
    background-color: #111111;
    color: #fff;
  }
`;

export default SignUp;
