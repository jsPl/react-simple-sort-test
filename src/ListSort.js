import React, { useState } from 'react';
import classNames from 'classnames';

export function ListSort({ items, setItems, renderItem }) {
  const [isSortEnabled, setSortEnabled] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [sortMode, setSortMode] = useState('vertical');

  const handleItemSelect = evt => {
    if (!isSortEnabled) {
      return;
    }

    const itemEl = evt.target.closest('.item');
    const id = Number(itemEl?.dataset.id);
    setSelectedItemId(id);
  };

  const handleItemSort = evt => {
    const selectedItemIdx = items.findIndex(o => o.id === selectedItemId);
    let reorderedItems;

    switch (evt.key) {
      case (sortMode === 'vertical' && 'ArrowUp') || (sortMode === 'horizontal' && 'ArrowLeft'):
        evt.preventDefault();
        reorderedItems = moveInArray(items, selectedItemIdx, Math.max(selectedItemIdx - 1, 0));
        break;

      case (sortMode === 'vertical' && 'ArrowDown') || (sortMode === 'horizontal' && 'ArrowRight'):
        evt.preventDefault();
        reorderedItems = moveInArray(items, selectedItemIdx, Math.min(selectedItemIdx + 1, items.length - 1));
        break;

      case 'Escape':
        setSelectedItemId(null);
        break;

      default:
        break;
    }

    if (reorderedItems) {
      setItems(reorderedItems);
    }
  };

  const handleSortEnabled = () => {
    setSortEnabled(prev => !prev);
    setSelectedItemId(null);
  };

  return (
    <>
      <div className={`container ${sortMode}`} tabIndex="0" onClick={handleItemSelect} onKeyDown={handleItemSort}>
        {items.map(o => (
          <div className={classNames({ item: true, selected: o.id === selectedItemId })}
            key={o.id} data-id={o.id}>
            <SortableItem selectedItemId={selectedItemId} itemId={o.id} sortMode={sortMode}>
              {renderItem(o)}
            </SortableItem>
          </div>
        ))}
      </div>

      <button type="button" onClick={handleSortEnabled}>
        {isSortEnabled ? 'disable sort' : 'enable sort'}
      </button>
      <select value={sortMode} onChange={evt => setSortMode(evt.target.value)}>
        <option value="vertical">vertical</option>
        <option value="horizontal">horizontal</option>
      </select>

      <pre className="state">
        {JSON.stringify(items.map(({ id, blend_name, variety, topping }) => ({ id, blend_name, variety, topping })), undefined, 2)}
      </pre>
    </>
  );
}

const SortableItem = ({ itemId, selectedItemId, children, sortMode }) => {
  const arrowsUpDown = <span><kbd>&#8593;</kbd><kbd>&#8595;</kbd></span>;
  const arrowsLeftRight = <span><kbd>&#8592;</kbd><kbd>&#8594;</kbd></span>;
  const arrows = sortMode === 'vertical' ? arrowsUpDown : arrowsLeftRight;

  return (
    <>
      {children}
      {selectedItemId === itemId && arrows}
    </>
  )
}

const moveInArray = (arr, from, to) => {
  const clone = [...arr];

  // Make sure a valid array is provided
  if (Object.prototype.toString.call(clone) !== '[object Array]') {
    throw new Error('Please provide a valid array');
  }

  // Delete the item from it's current position
  const item = clone.splice(from, 1);

  // Make sure there's an item to move
  if (!item.length) {
    throw new Error('There is no item in the array at index ' + from);
  }

  // Move the item to its new position
  clone.splice(to, 0, item[0]);
  return clone;
}