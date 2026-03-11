import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //테스트 환경에서 div간 경계를 확인하기 위한 용도
  const debug = process.env.NODE_ENV === 'development'?"solid":"none";
  return (
    <>
      <div className='main-frame'>
        <div style={{ border: debug}}>
          오디오영역
        </div>
        <div style={{ border: debug}}>
          신랑/신부 이름 어디서 언제 결혼 표시 영역
        </div>
        <div style={{ border: debug}}>
          신랑/신부 대표 사진
        </div>
        <div style={{ border: debug}}>
          웰컴 문구
        </div>
        <div style={{ border: debug}}>
          달력
        </div>
        <div style={{ border: debug}}>
          이미지 갤러리
        </div>
        <div style={{ border: debug}}>
          결혼식 장소
        </div>
        <div style={{ border: debug}}>
          신랑신부 계좌 정보
        </div>
        <div style={{ border: debug}}>
          카카오톡 공유하기 / 모청 주소 복사하기
        </div>
      </div>
    </>
  )
}

export default App