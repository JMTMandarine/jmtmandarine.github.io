import './App.css'

function App() {
  const content = {
    couple: {
      groom: '태형',
      bride: '주리',
      groomFull: '김태형',
      brideFull: '최주리',
    },
    date: '2026년 10월 3일 (토) 오후 5시 00분',
    venue: {
      name: '로마노 리버사이드',
      address: '경기 남양주시 강변북로 632번길 16-13',
      guide: '주차 1시간 무료 · 공영 주차장 이용',
    },
    message:
      '서로의 하루를 가장 다정한 온도로 채워가겠습니다. 저희의 시작을 따뜻하게 축복해 주세요.',
    family: {
      groomParents: '신랑 태형',
      brideParents: '신부 주리',
      invite:
        '소중한 분들을 모시고 사랑의 서약을 나누려 합니다. 기쁜 마음으로 함께해 주세요.',
    },
    friends: ['한솔', '김지훈', '최태영', '성태진', '마담뚜-최한진', '최유리'],
    timeline: [
      { title: '예식 시작', detail: '오후 5시 00분' },
      { title: '식순 안내', detail: '신랑 입장 → 신부 입장 → 성혼 선언' },
      { title: '피로연', detail: '1층 옥외 및 실내 (예식 동시 진행)' },
    ],
    gallery: [
      '우리의 가장 빛나는 순간을 담았습니다.',
      '함께 걸어온 계절을 기억하며.',
      '앞으로의 시간을 기대해주세요.',
    ],
    contact: {
      groom: '신랑 010-1234-5678',
      bride: '신부 010-9865-4321',
    },
    account: {
      groom: '국민 111-111-111111 김태형',
      bride: '신한 222-222-222222 최주리',
    },
    share: {
      title: '마음 전하기',
      text: '모바일 청첩장 링크를 공유해 주세요.',
    },
  }

  return (
    <div className="page">
      <header className="hero section">
        <div className="hero-badge">WEDDING INVITATION</div>
        <h1 className="hero-title">
          {content.couple.groom} · {content.couple.bride}
        </h1>
        <p className="hero-sub">{content.date}</p>
        <p className="hero-location">{content.venue.name}</p>
        <div className="hero-art" aria-hidden="true" />
      </header>

      <section className="section message">
        <h2 className="section-title">초대합니다</h2>
        <p className="section-text">{content.message}</p>
      </section>

      <section className="section family">
        <h2 className="section-title">혼주 & 신랑신부</h2>
        <p className="section-text">{content.family.groomParents}</p>
        <p className="section-text">{content.family.brideParents}</p>
        <p className="section-note">{content.family.invite}</p>
      </section>

      <section className="section friends">
        <h2 className="section-title">친구들</h2>
        <div className="friends-grid">
          {content.friends.map((name) => (
            <p className="section-text" key={name}>
              {name}
            </p>
          ))}
        </div>
      </section>

      <section className="section gallery">
        <h2 className="section-title">갤러리</h2>
        <div className="gallery-grid">
          {content.gallery.map((text, index) => (
            <div className="gallery-card" key={text}>
              <div className="gallery-photo" aria-hidden="true" />
              <p className="gallery-text">{text}</p>
              <span className="gallery-tag">Moment {index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section timeline">
        <h2 className="section-title">예식 안내</h2>
        <div className="timeline-list">
          {content.timeline.map((item) => (
            <div className="timeline-item" key={item.title}>
              <p className="timeline-title">{item.title}</p>
              <p className="timeline-detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section location">
        <h2 className="section-title">오시는 길</h2>
        <div className="location-card">
          <p className="location-name">{content.venue.name}</p>
          <p className="location-address">{content.venue.address}</p>
          <p className="location-guide">{content.venue.guide}</p>
          <div className="map-placeholder">지도 영역</div>
        </div>
      </section>

      <section className="section contact">
        <h2 className="section-title">연락처</h2>
        <div className="contact-grid">
          <p>{content.contact.groom}</p>
          <p>{content.contact.bride}</p>
        </div>
      </section>

      <section className="section account">
        <h2 className="section-title">마음 전하실 곳</h2>
        <div className="account-grid">
          <p>{content.account.groom}</p>
          <p>{content.account.bride}</p>
        </div>
      </section>

      <section className="section share">
        <h2 className="section-title">{content.share.title}</h2>
        <p className="section-text">{content.share.text}</p>
        <div className="share-stamp">Thank You</div>
      </section>
    </div>
  )
}

export default App
