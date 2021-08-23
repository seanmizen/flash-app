import ItemListItem from "./ItemListItem";
import styles from "../DeckEditor.module.css";

function ItemList(props) {
  return (
    <ul className={styles["no-bullets"]}>
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
