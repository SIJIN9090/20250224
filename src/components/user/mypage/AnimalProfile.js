import { useState, useEffect } from 'react';
import axios from 'axios';

const AnimalProfile = () => {
    const [inputValue, setInputValue] = useState([]);

    // 회원가입 시 입력한 동물 정보 가져오기
    useEffect(() => {
        axios.get('http://백엔드_주소/api/user/animal')
            .then(response => {
                const animalData = response.data; // 백엔드에서 온 데이터
                setInputValue([{ name: animalData.name, species: animalData.species, age: animalData.age, weight: animalData.weight }]);
            })
            .catch(error => {
                console.error('Error fetching animal data:', error);
                setInputValue([{ name: '', species: '', age: '', weight: '' }]); // 기본 빈 폼 추가
            });
    }, []);

    const addContent = () => {
        setInputValue([...inputValue, { name: '', species: '', age: '', weight: '' }]);
    };

    const deleteContent = (index) => {
        const newInputValue = inputValue.filter((_, i) => i !== index); // 해당 인덱스를 제외한 새로운 배열 생성
        setInputValue(newInputValue);
    };

    return (
        <div className="Ex">
            <button onClick={addContent}>addContent</button>

            {inputValue.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    반려동물 정보 {index + 1}
                                    <button
                                        onClick={() => deleteContent(index)} // 각 폼에 맞는 삭제 함수 실행
                                        style={{
                                            marginLeft: '10px',
                                            float: 'right',
                                            background: 'red',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        삭제
                                    </button>
                                </th>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td><input type='text' value={item.name} onChange={(e) => {
                                    const newInputValue = [...inputValue];
                                    newInputValue[index].name = e.target.value;
                                    setInputValue(newInputValue);
                                }} /></td>
                            </tr>
                            <tr>
                                <th>종류</th>
                                <td><input type='text' value={item.species} onChange={(e) => {
                                    const newInputValue = [...inputValue];
                                    newInputValue[index].species = e.target.value;
                                    setInputValue(newInputValue);
                                }} /></td>
                            </tr>
                            <tr>
                                <th>나이</th>
                                <td><input type='text' value={item.age} onChange={(e) => {
                                    const newInputValue = [...inputValue];
                                    newInputValue[index].age = e.target.value;
                                    setInputValue(newInputValue);
                                }} /></td>
                            </tr>
                            <tr>
                                <th>무게</th>
                                <td><input type='text' value={item.weight} onChange={(e) => {
                                    const newInputValue = [...inputValue];
                                    newInputValue[index].weight = e.target.value;
                                    setInputValue(newInputValue);
                                }} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default AnimalProfile;
