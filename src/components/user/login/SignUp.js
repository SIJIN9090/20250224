import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import logo_b from "./imgs/logo_b.png";

function SignUp({ onSignupSuccess }) {
  const [forms, setForms] = useState([
    { id: Date.now(), petName: "", species: "", age: "" },
  ]);

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
  // --------------------------------------------------------------------------
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // 이메일 형식 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  const handleCodeChange = (e) => {
    const codeValue = e.target.value;
    setCode(codeValue);

    if (codeValue.length < 6) {
      setCodeError("인증 코드는 6자 이상이어야 합니다.");
    } else {
      setCodeError("");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    // 비밀번호 조건 체크 (예: 최소 8자, 숫자, 대문자 포함)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(passwordValue)) {
      setPasswordError(
        "비밀번호는 8자 이상, 대문자 및 숫자를 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    // 비밀번호 확인이 비밀번호와 일치하는지 체크
    if (confirmPasswordValue !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSendVerificationEmail = async () => {
    if (emailError) {
      return; // 이메일 형식이 잘못되었으면 전송하지 않음
    }

    try {
      const response = await axios.post("/api/email/send", null, {
        params: { receiver: email },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage("메일 전송 실패");
    }
  };

  const handleVerifyCode = async () => {
    if (codeError || !code) {
      return; // 코드가 없거나 형식에 오류가 있으면 전송하지 않음
    }

    try {
      const response = await axios.post("/api/email/verify", null, {
        params: { receiver: email, code: code },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage("인증 코드 확인 실패");
    }
  };

  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleNickNameCheck = async () => {
    if (!nickName) {
      setNickNameError("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get("/api/checkNickName", {
        params: { nickName },
      });

      // 중복되지 않으면 성공 메시지
      if (response.status === 200) {
        setNickNameMessage("사용 가능한 닉네임입니다.");
        setNickNameError("");
      }
    } catch (error) {
      // 중복일 경우 처리
      if (error.response && error.response.status === 400) {
        setNickNameMessage("이미 존재하는 닉네임입니다.");
        setNickNameError("닉네임을 다시 입력해주세요.");
      } else {
        setNickNameMessage("서버 오류가 발생했습니다.");
        setNickNameError("");
      }
    }
  };

  const handleSubmit = async () => {
    if (
      emailError ||
      codeError ||
      passwordError ||
      confirmPasswordError ||
      nickNameError ||
      !email ||
      !password ||
      !confirmPassword ||
      !nickName
    ) {
      return; // 오류가 있으면 회원가입하지 않음
    }

    const memberData = {
      email,
      password,
      confirmPassword,
      nickName,
      pets: forms.map((form) => ({
        petName: form.petName,
        species: form.species,
        age: form.age,
      })),
    };

    try {
      const response = await axios.post("/api/register", memberData);
      if (response.status === 200) {
        onSignupSuccess(); // 성공적으로 회원가입이 완료되면 후속 작업 수행
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
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
          <table>
            <tr></tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="이메일"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  type="button"
                  onClick={handleSendVerificationEmail}
                  disabled={emailError}
                >
                  인증
                </button>
              </td>
            </tr>

            <tr>
              <td>
                <input
                  type="text"
                  placeholder="인증 코드"
                  value={code}
                  onChange={handleCodeChange}
                />
                <button type="button" onClick={handleVerifyCode}>
                  확인
                </button>
              </td>
            </tr>
            <tr>
              <td className="idError">
                {(emailError || message) && (
                  <small style={{ color: emailError ? "red" : "green" }}>
                    {emailError || message}
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
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호 "
                  theme="underLine"
                  maxLength={16}
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="비밀번호 확인"
                  theme="underLine"
                  maxLength={16}
                />
              </td>
            </tr>
            <tr>
              <td>
                <td>
                  {(passwordError || confirmPasswordError) && (
                    <small style={{ color: "red" }}>
                      {passwordError || confirmPasswordError}
                    </small>
                  )}
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
                  value={nickName}
                  onChange={handleNickNameChange}
                  placeholder="닉네임을 입력하세요"
                />
                <button type="button" onClick={handleNickNameCheck}>
                  확인
                </button>
              </td>
            </tr>
            <tr>
              <td className="idError">
                {nickNameError && (
                  <small style={{ color: "red" }}>{nickNameError}</small>
                )}
                {nickNameMessage && (
                  <small style={{ color: nickNameError ? "red" : "green" }}>
                    {nickNameMessage}
                  </small>
                )}
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
          <button type="submit" onClick={handleSubmit}>
            회원가입
          </button>
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
