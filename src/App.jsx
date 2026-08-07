import { useState } from 'react'
import './App.css'

const invitation = {
  groom: '태형',
  bride: '주리',
  date: '2026년 10월 3일 (토) 오후 5시 00분',
  venue: {
    name: '로마노 리버사이드',
    address: '경기 남양주시 강변북로 632번길 16-13',
    guide: '주차 1시간 무료 · 공영 주차장 이용',
  },
  accounts: [
    { role: '신랑', name: '김태형', bank: '국민은행', number: '111-111-111111' },
    { role: '신부', name: '최주리', bank: '신한은행', number: '222-222-222222' },
  ],
}

const photoPaths = [
  '/images/wedding-main.jpg',
  '/images/wedding-01.jpg',
  '/images/wedding-02.jpg',
  '/images/wedding-03.jpg',
]

function Photo({ src, alt, className = '' }) {
  const [missing, setMissing] = useState(false)

  return (
    <div className={`photo-frame ${className} ${missing ? 'photo-placeholder' : ''}`}>
      {!missing && <img src={src} alt={alt} onError={() => setMissing(true)} />}
      {missing && <span>사진을 준비 중입니다</span>}
    </div>
  )
}

function App() {
  const [accountsOpen, setAccountsOpen] = useState(false)
  const [copied, setCopied] = useState('')

  const copyAccount = async (account) => {
    const text = `${account.bank} ${account.number} ${account.name}`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const input = document.createElement('textarea')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    setCopied(account.role)
    window.setTimeout(() => setCopied(''), 1800)
  }

  return (
    <main className="invitation">
      <section className="hero">
        <p className="eyebrow">WEDDING INVITATION</p>
        <h1><span>{invitation.groom}</span><i>&amp;</i><span>{invitation.bride}</span></h1>
        <p className="hero-message">서로의 하루를 가장 다정한 온도로<br />채워가겠습니다.</p>
        <Photo src={photoPaths[0]} alt={`${invitation.groom}과 ${invitation.bride}의 웨딩 사진`} className="hero-photo" />
        <div className="date-card">
          <strong>10. 03</strong>
          <p>{invitation.date}</p>
          <p>{invitation.venue.name}</p>
        </div>
      </section>

      <section className="section invitation-message">
        <p className="section-kicker">INVITATION</p>
        <h2>소중한 당신을 초대합니다</h2>
        <p>서로의 하루를 가장 다정한 온도로 채워가겠습니다.<br />저희의 시작을 따뜻하게 축복해 주세요.</p>
        <div className="names"><span>신랑 김태형</span><b>·</b><span>신부 최주리</span></div>
      </section>

      <section className="section gallery-section">
        <p className="section-kicker">GALLERY</p>
        <h2>우리의 순간</h2>
        <div className="gallery-grid">
          {photoPaths.slice(1).map((photo, index) => (
            <Photo key={photo} src={photo} alt={`웨딩 갤러리 사진 ${index + 1}`} />
          ))}
        </div>
      </section>

      <section className="section ceremony-section">
        <p className="section-kicker">THE CEREMONY</p>
        <h2>예식 안내</h2>
        <div className="ceremony-date"><span>2026</span><strong>10.03</strong><span>SAT 5:00 PM</span></div>
        <div className="venue-info">
          <strong>{invitation.venue.name}</strong>
          <p>{invitation.venue.address}</p>
          <p>{invitation.venue.guide}</p>
        </div>
        <a className="map-button" href={`https://map.naver.com/v5/search/${encodeURIComponent(invitation.venue.address)}`} target="_blank" rel="noreferrer">지도 보기 <span>→</span></a>
      </section>

      <section className="section contact-section">
        <p className="section-kicker">CONTACT</p>
        <h2>연락하기</h2>
        <div className="contact-row"><span>신랑 김태형</span><a href="tel:01012345678">전화</a><a href="sms:01012345678">문자</a></div>
        <div className="contact-row"><span>신부 최주리</span><a href="tel:01098654321">전화</a><a href="sms:01098654321">문자</a></div>
      </section>

      <section className="section account-section">
        <p className="section-kicker">GIFT</p>
        <h2>마음 전하실 곳</h2>
        <p className="account-intro">참석이 어려우신 분들을 위해<br />계좌번호를 안내드립니다.</p>
        <button className="toggle-button" type="button" onClick={() => setAccountsOpen((open) => !open)} aria-expanded={accountsOpen}>
          {accountsOpen ? '계좌번호 닫기' : '계좌번호 펼쳐보기'} <span>{accountsOpen ? '−' : '+'}</span>
        </button>
        {accountsOpen && <div className="account-list">
          {invitation.accounts.map((account) => (
            <div className="account-item" key={account.role}>
              <div><small>{account.role} {account.name}</small><strong>{account.bank} {account.number}</strong></div>
              <button type="button" onClick={() => copyAccount(account)}>{copied === account.role ? '복사됨' : '복사'}</button>
            </div>
          ))}
        </div>}
      </section>

      <footer>Thank you for celebrating with us</footer>
    </main>
  )
}

export default App
