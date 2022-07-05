import './App.css';

import {useState} from 'react';

import {postTicket} from '../utilis/api';
import Ticket from './ticket/Ticket';

function App() {
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
      .then(v => console.log(v))
      .catch(err => {
        if(count <= 2) {
          setTimeout(()=> handlerPostTicket(ticketResult, count + 1), 2000);
        } else {
          return console.log(`Данные не отправлены на сервер! ${err}`);
        }
      });
  }

  return (
    <div className="app">
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
