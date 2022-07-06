import './Popup.css';

import {useState} from 'react';

function Popup({type, message}) {
  const [isActive, setIsActive] = useState(true);
  const open = isActive ? 'popup_state_open' : '';

  function typeIconReturn(type) {
    if (type === 'error') return 'popup__icon_type_error';
    if (type === 'success') return 'popup__icon_type_success';
    if (type === 'alert') return  'popup__icon_type_alert';

  }

  function onClickCloset() {
    setIsActive(false);
  }

  return(
    <section className={`popup ${open}`}>
      <span className={`popup__icon ${typeIconReturn(type)}`}>

      </span>
      <div className="popup__container">
        {type === 'error' ? <h1 className="popup__title">Произошла ошибка</h1> : ''}
        {type === 'success' ? <h1 className="popup__title">Успех</h1> : ''}
        {type === 'alert' ? <h1 className="popup__title">Информация</h1> : ''}
        <p className="popup__message">{message}</p>
      </div>


      <button className="popup__btn-exit" type="button" onClick={onClickCloset}/>
    </section>
  );
}
export default Popup;