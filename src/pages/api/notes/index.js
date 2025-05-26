const fs = require('fs'); // 파일 시스템(fs) 모듈 불러오기 (파일 읽고 쓰기 위해)
const path = require('path'); // 경로(path) 모듈 불러오기 (폴더/파일 경로 쉽게 다루기 위해)

const NOTES_FILE = path.join(process.cwd(), 'data', 'notes.json'); // 현재 작업 디렉토리 기준으로 data/notes.json 파일 경로 생성

export default function handler(req, res) { // API 요청(req)과 응답(res)을 처리하는 핸들러 함수
  if (req.method === 'GET') {
    // 메모 목록 가져오기
    const data = fs.readFileSync(NOTES_FILE, "utf8") // notes.json 파일을 읽어서 문자열로 저장
    const notes = JSON.parse(data); // 문자열(JSON)을 자바스크립트 객체/배열로 변환

    res.status(200).json(notes); // 200 OK 상태로 메모 목록을 응답
  } else if (req.method === 'POST') {
    // 새 메모 추가
    const data = fs.readFileSync(NOTES_FILE, "utf8") // notes.json 파일을 다시 읽기
    const notes = JSON.parse(data);  // 현재 빈 배열 []

    const newNote = { // id, title, content 가 있음
        id: Date.now(), // 현재 시간을 id로 사용 (고유값 역할)
        ...req.body, // 요청 본문에서 title과 content 가져와서 합치기
    };
    notes.push(newNote); // 새로운 메모를 notes 배열에 추가

    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes)); // notes 배열을 다시 JSON 문자열로 바꿔서 파일에 저장
    res.status(201).json(newNote); // 201 Created 상태로 새로 추가한 메모를 응답
  } else {
    res.status(404).end(); // 다른 메서드는 404 Not Found 응답
  }
}