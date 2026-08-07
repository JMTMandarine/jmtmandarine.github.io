import { useEffect, useRef, useState } from 'react'
import mainPhoto from './assets/main-photo.jpg'
import subPhoto1 from './assets/sub-1.jpg'
import subPhoto2 from './assets/sub-2.jpg'
import subPhoto3 from './assets/sub-3.jpg'
import subPhoto4 from './assets/sub-4.jpg'
import './App.css'

const NAVER_MAP_CLIENT_ID = 'dbc2dqh1g9'

const invitation = {
  groom: '이태형',
  bride: '최주리',
  displayGroom: '태형',
  displayBride: '주리',
  date: '2026년 11월 22일 (일) 오후 12시 00분',
  venue: {
    latitude: 37.39937,
    longitude: 127.10872,
    name: '엔씨 알앤디센터 지하 1층 컨벤션홀',
    address: '경기도 성남시 분당구 대왕판교로644번길 12',
    guide: '건물 지하주차장 이용 · 무료',
  },
  contacts: [
    { role: '신랑', name: '이태형', phone: '010-5665-6213' },
    { role: '신부', name: '최주리', phone: '010-7137-1764' },
  ],
  accountGroups: [
    {
      side: '신랑측',
      accounts: [
        { name: '신랑 이태형', bank: '기업은행', number: '514-030287-01-011' },
        { name: '이상길', bank: '신한은행', number: '51404322446' },
        { name: '주진순', bank: '기업은행', number: '01079170089' },
      ],
    },
    {
      side: '신부측',
      accounts: [
        { name: '신부 최주리', bank: '국민은행', number: '362-21-0413-381' },
        { name: '김은숙', bank: '국민은행', number: '040002-04-052632' },
      ],
    },
  ],
}

const galleryPhotos = [subPhoto1, subPhoto2, subPhoto3, subPhoto4]

function Photo({ src, alt, className = '' }) {
  const [missing, setMissing] = useState(false)

  return (
    <div className={`photo-frame ${className} ${missing ? 'photo-placeholder' : ''}`}>
      {!missing && <img src={src} alt={alt} onError={() => setMissing(true)} />}
      {missing && <span>사진을 준비 중입니다</span>}
    </div>
  )
}

function NaverMap({ latitude, longitude, placeName }) {
  const mapElement = useRef(null)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const renderMap = () => {
      if (cancelled || !mapElement.current || !window.naver?.maps) return
      const position = new window.naver.maps.LatLng(latitude, longitude)
      const map = new window.naver.maps.Map(mapElement.current, {
        center: position,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: { position: window.naver.maps.Position.TOP_RIGHT },
      })
      new window.naver.maps.Marker({ position, map, title: placeName })
    }

    const existingScript = document.querySelector('script[data-naver-map-api]')
    if (existingScript) {
      if (window.naver?.maps?.Service) renderMap()
      else existingScript.addEventListener('load', renderMap, { once: true })
      return () => {
        cancelled = true
        existingScript.removeEventListener('load', renderMap)
      }
    }

    const script = document.createElement('script')
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`
    script.async = true
    script.dataset.naverMapApi = 'true'
    script.addEventListener('load', renderMap, { once: true })
    script.addEventListener('error', () => !cancelled && setMapError(true), { once: true })
    document.head.appendChild(script)
    return () => {
      cancelled = true
      script.removeEventListener('load', renderMap)
    }
  }, [latitude, longitude, placeName])

  if (mapError) return null
  return <div ref={mapElement} className="naver-map" aria-label={`${placeName} 지도`} />
}

function App() {
  const [openSide, setOpenSide] = useState('')
  const [copied, setCopied] = useState('')
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState(0)

  const copyAccount = async (account) => {
    const text = [account.bank, account.number, account.name].filter(Boolean).join(' ')
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
    setCopied(account.name)
    window.setTimeout(() => setCopied(''), 1800)
  }

  const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1)

  return (
    <main className="invitation">
      <section className="hero">
        <p className="eyebrow">WEDDING INVITATION</p>
        <h1><span>{invitation.displayGroom}</span><i>&amp;</i><span>{invitation.displayBride}</span></h1>
        <p className="hero-message">서로의 하루를 가장 다정한 온도로<br />채워가겠습니다.</p>
        <Photo src={mainPhoto} alt={`${invitation.groom}과 ${invitation.bride}의 웨딩 사진`} className="hero-photo" />
        <div className="date-card">
          <strong>11. 22</strong>
          <p>{invitation.date}</p>
          <p>{invitation.venue.name}</p>
        </div>
      </section>

      <section className="section invitation-message">
        <p className="section-kicker">INVITATION</p>
        <h2>소중한 당신을 초대합니다</h2>
        <p>서로의 하루를 가장 다정한 온도로 채워가겠습니다.<br />저희의 시작을 따뜻하게 축복해 주세요.</p>
        <div className="names"><span>신랑 이태형</span><b>·</b><span>신부 최주리</span></div>
      </section>

      <section className="family-section">
        <div className="family-names">
          <p><strong>이상길 · 주진순</strong>의 아들 <strong>이태형</strong></p>
          <p><strong>김은숙</strong>의 딸 <strong>최주리</strong></p>
        </div>
      </section>

      <section className="section gallery-section">
          <p className="section-kicker">GALLERY</p>
          <h2>우리의 순간</h2>
          <Photo src={galleryPhotos[selectedGalleryPhoto]} alt={`웨딩 갤러리 사진 ${selectedGalleryPhoto + 1}`} className="gallery-featured-photo" />
          <div className="gallery-grid">
            {galleryPhotos.map((photo, index) => (
              <button className={`gallery-thumbnail ${selectedGalleryPhoto === index ? 'is-selected' : ''}`} type="button" key={photo} onClick={() => setSelectedGalleryPhoto(index)} aria-label={`갤러리 사진 ${index + 1} 선택`} aria-pressed={selectedGalleryPhoto === index}>
                <Photo src={photo} alt="" />
              </button>
            ))}
          </div>
      </section>

      <section className="section calendar-section">
        <p className="section-kicker">SAVE THE DATE</p>
        <h2>2026년 11월</h2>
        <div className="calendar" aria-label="2026년 11월 달력">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => <span className="weekday" key={day}>{day}</span>)}
          {calendarDays.map((day) => <span key={day} className={day === 22 ? 'wedding-day' : ''}>{day}</span>)}
        </div>
        <p className="calendar-note">11월 22일 일요일, 오후 12시</p>
      </section>

      <section className="section ceremony-section">
        <p className="section-kicker">LOCATION</p>
        <h2>오시는 길</h2>
        <div className="ceremony-date"><span>2026</span><strong>11.22</strong><span>SUN 12:00 PM</span></div>
        <NaverMap latitude={invitation.venue.latitude} longitude={invitation.venue.longitude} placeName={invitation.venue.name} />
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
        {invitation.contacts.map((contact) => (
          <div className="contact-row" key={contact.role}><span>{contact.role} {contact.name}</span><a href={`tel:${contact.phone.replaceAll('-', '')}`}>전화 걸기</a></div>
        ))}
      </section>

      <section className="section account-section">
        <p className="section-kicker">GIFT</p>
        <h2>마음 전하실 곳</h2>
        <p className="account-intro">참석이 어려우신 분들을 위해<br />계좌번호를 안내드립니다.</p>
        <div className="account-groups">
          {invitation.accountGroups.map((group) => {
            const isOpen = openSide === group.side
            return <div className="account-group" key={group.side}>
              <button className="toggle-button" type="button" onClick={() => setOpenSide(isOpen ? '' : group.side)} aria-expanded={isOpen}>
                {group.side} 계좌번호 <span>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <div className="account-list">
                {group.accounts.map((account) => (
                  <div className="account-item" key={account.name}>
                    <div><small>{account.name}</small>{account.pending ? <strong className="pending">추후 추가 예정</strong> : <strong>{[account.bank, account.number].filter(Boolean).join(' ')}</strong>}</div>
                    {!account.pending && <button type="button" onClick={() => copyAccount(account)}>{copied === account.name ? '복사됨' : '복사'}</button>}
                  </div>
                ))}
              </div>}
            </div>
          })}
        </div>
      </section>

      <footer>Thank you for celebrating with us</footer>
    </main>
  )
}

export default App
