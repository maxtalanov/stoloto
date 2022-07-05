import './Tool-btn.css';

import {useState} from 'react';

function ToolBtn({title, message, arr, maxLenght}) {
  const [error, setError] = useState({
    isActive: false,
    errorMessage: `Максимальное количество элементов может быть не более ${maxLenght}`,
  });

  function handleClick(el) {
    if (arr[0].filter((v) => v.isActive).length === maxLenght && !el.isActive) {
      setError({
        isActive: true,
        errorMessage: error.errorMessage,
      });
      return;
    }

    if (error.isActive === true) {
      setError({
        isActive: false,
        errorMessage: error.errorMessage,
      });

    }

    arr[1](a => a.map((v) => {
      if (v.number === el.number) {
        return {...v, isActive: !v.isActive};
      } else {
        return v;
      }
    }));
  }

  return (
    <section className="tool-btn">
      <div className="tool-btn__container">
        <h2 className="tool-btn__title">{title}</h2>
        <h3 className="tool-btn__message">{message}</h3>
      </div>
      <div className="tool-btn__container-btn">
        {
          arr[0] && arr[0].map((el, index) => {
            const active = el.isActive ? ' tool-btn__number_type_active' : '';
            return (
              <button
                key={index}
                className={`tool-btn__number${active}`}
                onClick={() => handleClick(el)}
              >
                {el.number}
              </button>
            );
          })
        }
      </div>
      {error.isActive
        ? <span className="tool-btn__error tool-btn__err-message">{error.errorMessage}</span>
        : ''
      }
    </section>
  );
}

export default ToolBtn;
