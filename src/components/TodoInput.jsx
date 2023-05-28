import { useRef, useEffect } from 'react';

function TodoInput({ value, onChange, onAdd }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(0, 0);
        }
      }, []);

    return (
      <div>
        <div className="todoInputBlock">
          <input
            type="text"
            value={ value }
            ref={ inputRef }
            onChange={ onChange }
            placeholder="What's need to be done"
          />
          <button onClick={ onAdd }>Add</button>
        </div>
      </div>
    );
  }
  
  export default TodoInput;