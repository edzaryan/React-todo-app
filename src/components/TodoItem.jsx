
import React from 'react';

function TodoItem({ todo, onToggleStatus, onRemove }) {
  return (
    <div className="todoItem">
      <input
        type="checkbox"
        checked={ todo.isDone }
        onChange={ onToggleStatus }
      />
      <div>{ todo.text }</div>
      <button onClick={ onRemove }>Delete</button>
    </div>
  );
}

export default TodoItem;