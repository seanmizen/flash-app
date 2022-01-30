import ItemListItem from "./ItemListItem";
import styles from "../DeckEditor.module.css";

function ItemList(props) {
  return (
    <ul
      className={
        styles["item-list"] + (props.ghost ? " " + styles["ghost"] : "")
      }
    >
      {props.list?.map((item) => {
        return (
          <ItemListItem
            key={item.id}
            id={item.id}
            allowEdit={props.allowEdit}
            onDeleted={props.onDeleted}
            prompt={item.prompt}
            answer={item.answer}
            image={item.image}
            answerImage={item.answerImage}
            editItemCallback={props.editItemCallback}
          />
        );
      })}
    </ul>
  );
}

export default ItemList;
