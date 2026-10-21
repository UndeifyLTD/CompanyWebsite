// Undeify UI kit — the HTML/CSS product diagrams (always captioned "not a screenshot").
function NowIllustration() {
  const places = [['a', 'Yaba', 'food'], ['b', 'Ikeja', 'live music'], ['c', 'Victoria Island', 'art'], ['d', 'Lekki', 'beach']];
  const posts = [['', 'Yaba', 'food', 'Worth it'], ['av--2', 'Lekki', 'beach', 'Worth it'], ['av--3', 'Ikeja', 'live music', 'Skip'], ['', 'Victoria Island', 'art', 'Worth it']];
  return (
    <div className="shot shot--panel">
      <div className="win">
        <div className="win__bar"><i></i><i></i><i></i><b>NOW</b><span className="win__search">Search places in Lagos</span></div>
        <div className="win__body map">
          {['a', 'b', 'c', 'd'].map((r) => <i key={r} className={`road road--${r}`}></i>)}
          {places.map(([k, n, t]) => <div key={k} className={`place place--${k}`}><span>{n} <em>· {t}</em></span></div>)}
        </div>
      </div>
      <div className="phone">
        <p className="phone__title">Near you</p>
        {posts.map(([av, n, t, v], i) => (
          <div className="post" key={i}><i className={`av ${av}`}></i><div><b>{n}</b><span>{t}</span></div><em className={v === 'Skip' ? 'meh' : ''}>{v}</em></div>
        ))}
      </div>
      <figcaption className="shot__caption">Illustration of NOW, not a screenshot</figcaption>
    </div>
  );
}

const ROTA = {
  'Front desk': ['am', 'am', 'pm', 'am', 'leave', 'pm', ''],
  Kitchen: ['pm', '', 'am', 'am', 'pm', 'am', 'am'],
  Service: ['am', 'pm', 'pm', '', 'am', 'am', 'pm'],
  Cleaning: ['', 'am', 'leave', 'leave', 'am', 'pm', 'am'],
};
function ShiftIllustration() {
  const [active, setActive] = React.useState('Rota');
  return (
    <div className="shot shot--panel">
      <div className="win win--wide">
        <div className="win__bar"><i></i><i></i><i></i><b>ShiftOS</b><span className="win__search">This week</span></div>
        <div className="win__body win__split">
          <ul className="side">{['Rota', 'Attendance', 'Leave', 'Team'].map((s) => <li key={s} className={s === active ? 'on' : ''} onClick={() => setActive(s)} style={{ cursor: 'pointer' }}>{s}</li>)}</ul>
          <div className="rota">
            <span></span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <span key={d} className="day">{d}</span>)}
            {Object.entries(ROTA).map(([team, cells]) => (
              <React.Fragment key={team}><span>{team}</span>{cells.map((c, i) => <b key={i} className={c}></b>)}</React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="phone">
        <p className="phone__title">My shifts</p>
        <div className="post"><i className="sq"></i><div><b>Mon</b><span>Morning · Front desk</span></div></div>
        <div className="post"><i className="sq"></i><div><b>Tue</b><span>Morning · Front desk</span></div></div>
        <div className="post"><i className="sq sq--pm"></i><div><b>Wed</b><span>Evening · Front desk</span></div></div>
        <div className="post"><i className="sq sq--leave"></i><div><b>Fri</b><span>Leave approved</span></div></div>
      </div>
      <figcaption className="shot__caption">Illustration of ShiftOS, not a screenshot</figcaption>
    </div>
  );
}

Object.assign(window, { NowIllustration, ShiftIllustration });
