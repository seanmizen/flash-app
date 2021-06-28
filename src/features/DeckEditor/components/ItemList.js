function ItemList(props) {
  return <ul>
    {props.list.map(item => {
      return (
        <li key={item.id}>
          <div className="item-prompt"><b>{item.prompt}</b></div>
          <div className="item-answer">{item.answer}</div>
          <button
            onClick={() => props.onDeleted(item.id)}
          >X</button>
        </li>
      )
    })}
  </ul>
}

export default ItemList;
