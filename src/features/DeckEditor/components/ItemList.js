import ItemListItem from "./ItemListItem";

function ItemList(props) {
  return (
    <ul>
      {props.list?.map((item) => {
        return (
          <ItemListItem
            id={item.id}
            allowEdit={props.allowEdit}
            onDeleted={props.onDeleted}
            prompt={item.prompt}
            answer={item.answer}
            editItemCallback={props.editItemCallback}
          />
        );
      })}
    </ul>
  );
}

export default ItemList;
