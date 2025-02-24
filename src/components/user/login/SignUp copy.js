// import React, { useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import logo_b from "./imgs/logo_b.png";

// function SignUp() {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");

//   const [idError, setIdError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmError, setConfirmError] = useState("");

//   const [isIdCheck, setIsIdCheck] = useState(false);
//   const [isIdAvailable, setIsIdAvailable] = useState(false);

//   const onChangeIdHandler = (e) => {
//     const idValue = e.target.value;
//     setId(idValue);
//     idCheckHandler(idValue);
//   };

//   const onChangePasswordHandler = (e) => {
//     const { name, value } = e.target;
//     if (name === "password") {
//       setPassword(value);
//       passwordCheckHandler(value, confirm);
//     } else {
//       setConfirm(value);
//       passwordCheckHandler(password, value);
//     }
//   };

//   const idCheckHandler = async (id) => {
//     const idRegex = /^[a-z\d]{5,10}$/;
//     if (id === "") {
//       setIdError("아이디를 입력해주세요.");
//       setIsIdAvailable(false);
//       return false;
//     } else if (!idRegex.test(id)) {
//       setIdError("아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.");
//       setIsIdAvailable(false);
//       return false;
//     }
//     try {
//       const responseData = await idDuplicateCheck(id);
//       if (responseData) {
//         setIdError("사용 가능한 아이디입니다.");
//         setIsIdCheck(true);
//         setIsIdAvailable(true);
//         return true;
//       } else {
//         setIdError("이미 사용중인 아이디입니다.");
//         setIsIdAvailable(false);
//         return false;
//       }
//     } catch (error) {
//       alert("서버 오류입니다. 관리자에게 문의하세요.");
//       console.error(error);
//       return false;
//     }
//   };

//   const idDuplicateCheck = async (id) => {
//     try {
//       const response = await fetch(`/api/check-id?userId=${id}`);
//       const data = await response.json();
//       return data.available; // 서버 응답 구조에 따라 수정 필요
//     } catch (error) {
//       console.error("아이디 중복 확인 요청 실패:", error);
//       return false;
//     }
//   };

//   const passwordCheckHandler = (password, confirm) => {
//     const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
//     if (password === "") {
//       setPasswordError("비밀번호를 입력해주세요.");
//       return false;
//     } else if (!passwordRegex.test(password)) {
//       setPasswordError(
//         "비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다."
//       );
//       return false;
//     } else if (confirm !== password) {
//       setPasswordError("");
//       setConfirmError("비밀번호가 일치하지 않습니다.");
//       return false;
//     } else {
//       setPasswordError("");
//       setConfirmError("");
//       return true;
//     }
//   };
//   const [nickname, setNickname] = useState("");
//   const [nicknameError, setNicknameError] = useState("");
//   const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
//   const [isNicknameCheck, setIsNicknameCheck] = useState(false);

//   const nicknameCheckHandler = async (nickname) => {
//     const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
//     if (nickname === "") {
//       setNicknameError("닉네임을 입력해주세요.");
//       setIsNicknameAvailable(false);
//       return false;
//     } else if (!nicknameRegex.test(nickname)) {
//       setNicknameError(
//         "닉네임은 2~10자의 영소문자, 숫자, 한글만 입력 가능합니다."
//       );
//       setIsNicknameAvailable(false);
//       return false;
//     }
//     try {
//       const responseData = await nicknameDuplicateCheck(nickname);
//       if (responseData) {
//         setNicknameError("사용 가능한 닉네임입니다.");
//         setIsNicknameCheck(true);
//         setIsNicknameAvailable(true);
//         return true;
//       } else {
//         setNicknameError("이미 사용중인 닉네임입니다.");
//         setIsNicknameAvailable(false);
//         return false;
//       }
//     } catch (error) {
//       alert("서버 오류입니다. 관리자에게 문의하세요.");
//       console.error(error);
//       return false;
//     }
//   };
//   const nicknameDuplicateCheck = async (nickname) => {
//     try {
//       const response = await fetch(`/api/check-nickname?nickname=${nickname}`);
//       const data = await response.json();
//       return data.isAvailable; // 서버에서 받은 { isAvailable: true/false }
//     } catch (error) {
//       console.error("닉네임 중복 확인 중 오류 발생:", error);
//       return false; // 에러가 발생한 경우 닉네임을 사용 불가능한 것으로 간주
//     }
//   };

//   // const signupHandler = async (e) => {
//   //   e.preventDefault();

//   //   const idCheckresult = await idCheckHandler(id);
//   //   if (idCheckresult) setIdError("");
//   //   else return;
//   //   if (!isIdCheck || !isIdAvailable) {
//   //     alert("아이디 중복 검사를 해주세요.");
//   //     return;
//   //   }

//   //   const passwordCheckResult = passwordCheckHandler(password, confirm);
//   //   if (passwordCheckResult) {
//   //     setPasswordError("");
//   //     setConfirmError("");
//   //   } else return;

//   //   try {
//   //     const responseData = await signup(id, password, confirm);
//   //     if (responseData) {
//   //       localStorage.setItem("loginId", id);
//   //       setOpenModal(true);
//   //     } else {
//   //       alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
//   //     }
//   //   } catch (error) {
//   //     alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
//   //     console.error(error);
//   //   }
//   // };
//   const [forms, setForms] = useState([{ id: Date.now(), nickname: "" }]);

//   // 폼 추가
//   const addForm = () => {
//     setForms([...forms, { id: Date.now(), nickname: "" }]);
//   };

//   // 폼 삭제
//   const removeForm = (id) => {
//     setForms(forms.filter((form) => form.id !== id));
//   };

//   return (
//     <SignupContainer>
//       <SignupSection>
//         <SignupLogo>
//           <img src={logo_b} />
//         </SignupLogo>

//         <SignupTitle>
//           <h1>회원가입</h1>
//         </SignupTitle>

//         <MailBox>
//           <table>
//             <tr></tr>
//             <tr>
//               <td>
//                 <input
//                   onChange={onChangeIdHandler}
//                   type="email"
//                   id="id"
//                   name="id"
//                   value={id}
//                   placeholder="이메일"
//                   theme="underLine"
//                   maxLength={10}
//                 />
//                 <button>인증</button>
//               </td>
//             </tr>

//             <tr>
//               <td>
//                 <input type="text" placeholder="인증 코드" />
//                 <button>확인</button>
//               </td>
//             </tr>
//             <tr>
//               <td className="idError">
//                 {idError && (
//                   <small className={isIdAvailable ? "idAvailable" : ""}>
//                     {idError}
//                   </small>
//                 )}
//               </td>
//             </tr>
//           </table>
//         </MailBox>

//         <PwBox>
//           <table>
//             <tr>
//               <td>
//                 <input
//                   onChange={onChangePasswordHandler}
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={password}
//                   placeholder="비밀번호 "
//                   theme="underLine"
//                   maxLength={16}
//                 />
//               </td>
//             </tr>

//             <tr>
//               <td>
//                 <input
//                   onChange={onChangePasswordHandler}
//                   type="password"
//                   id="confirm"
//                   name="confirm"
//                   value={confirm}
//                   placeholder="비밀번호 확인"
//                   theme="underLine"
//                   maxLength={16}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 {" "}
//                 <td>{passwordError && <small>{passwordError}</small>}</td>
//                 {/* {confirmError && <small>{confirmError}</small>} */}
//               </td>
//             </tr>
//           </table>
//         </PwBox>

//         <NickBox>
//           <table>
//             <tr>
//               <td>
//                 {" "}
//                 <input
//                   id="nickname"
//                   type="text"
//                   value={nickname}
//                   onChange={(e) => setNickname(e.target.value)}
//                   onBlur={() => nicknameCheckHandler(nickname)} // Trigger the check when the input loses focus
//                   placeholder="닉네임을 입력하세요"
//                 />
//                 <button>확인</button>
//               </td>
//             </tr>
//             <tr>
//               <td className="idError">
//                 {nicknameError && <small>{nicknameError}</small>}
//                 {isNicknameAvailable && (
//                   <small>사용 가능한 닉네임입니다.</small>
//                 )}
//               </td>
//             </tr>
//           </table>
//         </NickBox>
//         <OtherBox>
//           <table>
//             <tr>
//               <td>
//                 <input type="text" placeholder="이름" />
//               </td>
//             </tr>
//             <tr>
//               {" "}
//               <td>
//                 <input type="text" placeholder="주소" />
//                 <button>검색</button>
//               </td>
//             </tr>
//             <tr>
//               {" "}
//               <td>
//                 {" "}
//                 <input type="text" placeholder="상세주소" />
//               </td>
//             </tr>

//             <tr>
//               <td>
//                 <input type="text" placeholder="생년월일" />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <input type="text" placeholder="전화번호" />
//               </td>
//             </tr>
//           </table>
//         </OtherBox>
//         <AnimalBox>
//           <table>
//             <tr>
//               <td>
//                 {" "}
//                 <AnimalBoxButton>
//                   <button onClick={addForm}>추가</button>
//                 </AnimalBoxButton>{" "}
//               </td>{" "}
//             </tr>
//           </table>
//           {forms.map((form) => (
//             <Formtable key={form.id}>
//               <tr>
//                 <td>
//                   <AnimalH1>
//                     <h1>반려동물정보</h1>
//                   </AnimalH1>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <input
//                     className="fristinput"
//                     type="text"
//                     placeholder="동물이름"
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <input type="text" placeholder="동물종류" />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <input type="text" placeholder="동물나이" />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <input type="text" placeholder="동물무게" />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   {" "}
//                   <AnimalBoxButton>
//                     <button danger onClick={() => removeForm(form.id)}>
//                       삭제
//                     </button>
//                   </AnimalBoxButton>{" "}
//                 </td>{" "}
//               </tr>
//             </Formtable>
//           ))}
//         </AnimalBox>
//         <SignupSectionE>
//           <button type="submit">회원가입</button>
//           {/* {setOpenModal ? openModal && <SignupModal /> : null} */}
//         </SignupSectionE>
//       </SignupSection>
//     </SignupContainer>
//   );
// }

// const SignupContainer = styled.div`
//   width: 1920px;
//   height: 100%;
//   min-height: 1840px;
//   width: 100%;
//   max-width: 1920px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const SignupSection = styled.div`
//   margin: auto;
//   align-items: center;
//   margin-top: 130px;
//   padding-top: 30px;
//   width: 500px;
//   min-height: 1574px;
//   background-color: #f4f4f4;
//   margin-bottom: 30px;
// `;
// // -------------------------------------------------------------------
// const SignupLogo = styled.div`
//   justify-content: center;
//   display: flex;
//   align-items: center;
//   width: 500px;
//   height: 40px;
//   background-color: #f4f4f4;
//   margin-bottom: 30px;
//   img {
//     width: 145px;
//     height: 35px;
//   }
// `;

// const SignupTitle = styled.div`
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   width: 500px;
//   height: 40px;
//   margin-bottom: 30px;
//   h1 {
//     font-size: 36px;
//     color: #111111;
//     font-weight: bold;
//   }
// `;

// // -----------------------------------------------------------------
// const MailBox = styled.div`
//   width: 500px;

//   align-items: center;
//   display: flex;
//   margin-bottom: 10px;
//   justify-content: center;
//   background-color: #f4f4f4;

//   td {
//     position: relative;
//   }

//   input {
//     font-weight: 300;
//     margin-bottom: 2px;
//     border: none;
//     padding-left: 20px;
//     font-size: 20px;
//     width: 460px;
//     height: 60px;
//   }
//   button {
//     width: 50px;
//     height: 26px;
//     background-color: #f4f4f4;
//     font-weight: 500;
//     position: absolute;
//     top: 14px;
//     right: 14px;
//     font-size: 20px;
//   }
//   .idError {
//     padding-top: 8px;
//     width: 460px;
//     height: 20px;
//   }
//   small {
//     padding-left: 10px;
//     font-size: 12px;
//   }
// `;
// // ------------------------------------------------------------------------
// const PwBox = styled.div`
//   width: 500px;

//   align-items: center;
//   display: flex;
//   margin-bottom: 10px;
//   justify-content: center;
//   background-color: #f4f4f4;

//   td {
//     position: relative;
//   }

//   input {
//     font-weight: 300;
//     margin-bottom: 2px;
//     border: none;
//     padding-left: 20px;
//     font-size: 20px;
//     width: 460px;
//     height: 60px;
//   }
//   button {
//     width: 50px;
//     height: 26px;
//     background-color: #f4f4f4;
//     font-weight: 500;
//     position: absolute;
//     top: 14px;
//     right: 14px;
//     font-size: 20px;
//   }
//   .idError {
//     padding-top: 8px;
//     width: 460px;
//     height: 20px;
//   }
//   small {
//     padding-left: 10px;
//     font-size: 12px;
//   }
// `;
// // ------------------------------------------------------------------------

// const NickBox = styled.div`
//   width: 500px;
//   align-items: center;
//   display: flex;
//   margin-bottom: 10px;
//   justify-content: center;
//   background-color: #f4f4f4;

//   td {
//     position: relative;
//   }

//   input {
//     font-weight: 300;
//     margin-bottom: 2px;
//     border: none;
//     padding-left: 20px;
//     font-size: 20px;
//     width: 460px;
//     height: 60px;
//   }
//   button {
//     width: 50px;
//     height: 26px;
//     background-color: #f4f4f4;
//     font-weight: 500;
//     position: absolute;
//     top: 14px;
//     right: 14px;
//     font-size: 20px;
//   }
//   .idError {
//     padding-top: 8px;
//     width: 460px;
//     height: 20px;
//   }
//   small {
//     padding-left: 10px;
//     font-size: 12px;
//   }
// `;
// // ------------------------------------------------------------------------
// const OtherBox = styled.div`
//   width: 500px;
//   align-items: center;
//   display: flex;
//   margin-bottom: 10px;
//   justify-content: center;
//   background-color: #f4f4f4;

//   td {
//     position: relative;
//   }

//   input {
//     font-weight: 300;
//     margin-bottom: 2px;
//     border: none;
//     padding-left: 20px;
//     font-size: 20px;
//     width: 460px;
//     height: 60px;
//   }
//   button {
//     width: 50px;
//     height: 26px;
//     background-color: #f4f4f4;
//     font-weight: 500;
//     position: absolute;
//     top: 14px;
//     right: 14px;
//     font-size: 20px;
//   }
// `;
// // -----------------------------------------------------------------
// const AnimalBox = styled.div`
//   width: 100%;
//   max-width: 500px;
//   background-color: #f4f4f4;

//   display: flex;
//   flex-direction: column; /* 세로 정렬 */
//   align-items: center;
//   justify-content: center;
// `;

// const AnimalBoxButton = styled.div`
//   background-color: #f4f4f4;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
//   button {
//     font-size: 18px;
//     background-color: #ffffff;
//     padding: 10px 20px;
//     border: 1px solid #ccc;
//     cursor: pointer;
//     margin: 5px;
//   }
// `;

// const AnimalH1 = styled.div`
//   margin-top: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   h1 {
//     font-size: 28px;
//     font-weight: 700;
//   }
// `;

// const Formtable = styled.table`
//   width: 100%;
//   max-width: 800px;
//   background-color: #f4f4f4;
//   margin: 10px auto;
//   border-collapse: collapse;

//   td {
//     padding: 2px;
//     text-align: center;
//     vertical-align: middle;
//   }

//   input {
//     width: 100%;
//     max-width: 460px;
//     height: 60px;
//     border: none;
//     font-size: 16px;
//     padding-left: 20px;
//   }
// `;

// // ----------------------------------------------------------
// const SignupSectionE = styled.div`
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   width: 500px;
//   height: 60px;
//   margin-top: 20px;
//   button {
//     font-size: 20px;
//     font-weight: 700;
//     width: 460px;
//     height: 60px;
//     background-color: #111111;
//     color: #fff;
//   }
// `;

// export default SignUp;
