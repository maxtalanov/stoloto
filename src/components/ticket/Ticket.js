import './Tiicket.css';

import {useEffect, useState} from 'react';

import iconBtnMagic from '../../images/magic.svg';
import ToolBtn from './tool-btn/Tool-btn';

function Ticket({type, title, message, handlerPostTicket}) {
  const configArrOne = 19;
  const configArrTwo = 2;

  const [arrOne, setArrOne] = useState([]);
  const [arrTwo, setArrTwo] = useState([]);

  const disabledBtnSubmit = arrOne.filter(v => v.isActive).length === 8 && arrTwo.filter(v => v.isActive).length === 1;


  useEffect(() => {
    setArrOne(generationArr(configArrOne));
  }, [configArrOne]);

  useEffect(() => {
    setArrTwo(generationArr(configArrTwo));
  }, [configArrTwo]);


  const toolbar = <div>
    <ToolBtn
      title="Поле 1"
      message="Отметьте 8 чисел."
      arr={[arrOne, setArrOne]}
      maxLenght={8}
    />
    <ToolBtn
      title="Поле 2"
      message="Отметьте 1 число."
      arr={[arrTwo, setArrTwo]}
      maxLenght={1}
    />
  </div>;

  const btnSubmit = <div className="ticket__btn-submit-container">
    <button
      className="ticket__btn-submit"
      disabled={!disabledBtnSubmit}
      onClick={handleSubmit}
    >Показать результат
    </button>
  </div>;

  function generationArr(count) {
    const newArr = [];

    for (let i = 1; i < count + 1; i++) {
      const arrElement = {number: i, isActive: false};
      newArr.push(arrElement);
    }

    return newArr;
  }

  function autoSelection(arr, count) {
    return arr
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  function handleMagicBtnClick() {
    const randomOne = autoSelection([...arrOne], 8);
    const randomTwo = autoSelection([...arrTwo], 1);

    setArrOne(state => state.map((v) => {
      const el = randomOne.find((i) => i.number === v.number);
      if (el) {
        return {...v, isActive: true};
      } else {
        return {...v, isActive: false};
      }
    }));

    setArrTwo(state => state.map((v) => {
      const el = randomTwo.find((i) => i.number === v.number);
      if (el) {
        return {...v, isActive: true};
      } else {
        return {...v, isActive: false};
      }
    }));
  }

  function selectedNumber(arr) {
    return arr
      .filter(v => v.isActive === true)
      .map(v => v.number);
  }

  function handleSubmit() {
    handlerPostTicket({
      selectedNumber: {
        firstField: selectedNumber(arrOne),
        secondField: selectedNumber(arrTwo),
      },
      isTicketWon: Math.random() < 0.5,
    });
  }

  return (
    <section className="ticket">

      <div className="ticket__heading">
        <h1 className="ticket__title">{title}</h1>
        {
          type === 'game'
            ? <button className="ticket__btn-magic" onClick={handleMagicBtnClick}>
              <img src={iconBtnMagic} alt={'Иконка случайного выбора'}/>
            </button>
            : null
        }
      </div>
      {
        type === 'result'
          ? <p className="ticket__message">{message}</p>
          : null
      }

      {
        type === 'game'
          ? toolbar
          : null
      }
      {
        type === 'game'
          ? btnSubmit
          : null
      }
    </section>
  );
}

export default Ticket;
