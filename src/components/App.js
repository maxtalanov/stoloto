import './App.css';

import {useState} from 'react';

import {postTicket} from '../utilis/api';
import Popup from './popup/Popup';
import Ticket from './ticket/Ticket';

function App() {
  const [popup, setPopup] = useState({
    isOpen: false ,
    type: '',
    message: '',
  });
  const [ticketResult, setTicketResult] = useState({
    isLock: false,
    isNoLock: false,
  });

  function handlerPostTicket(ticketResult, count = 1) {
    if (ticketResult.isTicketWon) {
      setTicketResult({isLock: true, isNoLock: false});
    } else {
      setTicketResult({isLock: false, isNoLock: true});
    }

    return postTicket(ticketResult)
      .then(v => {
        setPopup({
          isOpen: true, type: 'success', message: 'Данные успешно отправлены',
        });
      })
      .catch(err => {
        if(count <= 2) {
          setPopup({isOpen: true, type: 'alert', message: `Пытаемся отправить данные. Попытка: ${count + 1}`});
          setTimeout(()=> handlerPostTicket(ticketResult, count + 1), 2000);
        } else {
          return setPopup({isOpen: true, type: 'error', message: `Данные не отправлены на сервер! ${err}`});
        }
      });
  }

  return (
    <div className="app">
      {popup.isOpen
        ? <Popup type={popup.type} message={popup.message} />
        : ''
      }
      {!ticketResult.isLock && !ticketResult.isNoLock
        ? <Ticket type="game" title="Билет 1" handlerPostTicket={handlerPostTicket}/>
        : ''
      }
      {ticketResult.isLock
        ? <Ticket type="result" title="Билет 1" message="Ого, вы выиграли! Поздравляем!"/>
        : ''
      }
      {ticketResult.isNoLock
        ? <Ticket type="result" title="Билет 1" message="Ксожалению не удача! Вы проиграли!"/>
        : ''
      }
    </div>
  );
}

export default App;
