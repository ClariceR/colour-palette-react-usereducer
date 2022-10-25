import React, { useReducer, useRef } from 'react';

function ColourPalette() {
  const inputTextPaletteName = useRef();
  const hexColor = useRef();

  const [colors, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [
          ...state,
          {
            id: state.length,
            name: action.name,
            color: action.color,
          },
        ];
      case 'remove':
        return state.filter((_, index) => index !== action.index);
      case 'clear':
        return state = [];
      default:
        return state;
    }
  }, []);

  const addToList = () => {
    dispatch({
      type: 'add',
      name: inputTextPaletteName.current.value,
      color: hexColor.current.value,
    });
    inputTextPaletteName.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputTextPaletteName}
          type="text"
          placeholder="colour name"
        />
        <input ref={hexColor} type="color" />
        <button onClick={() => addToList()}>☑️</button>
      </form>
      <button onClick={() => dispatch({ type: 'clear' })}>DELETE ALL</button>
      <ul
        style={{
          listStyleType: 'none',
          listStylePosition: 'outside',
          padding: '0',
        }}
      >
        {colors.map((color, index) => (
          <li key={color.id}>
            {color.name}{' '}
            <button
              style={{
                background: color.color,
                border: 'none',
                height: '1rem',
                width: '1rem',
                borderRadius: '1rem',
              }}
            ></button>{' '}
            <button onClick={() => dispatch({ type: 'remove', index })}>
              ✖️
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ColourPalette;
