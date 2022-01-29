import Supabase from "./Supabase";

// just say this in a kiwi accent

export async function GetDeck(id) {
  const { data, error } = await Supabase.from("decks").select("*", {
    count: "exact",
  });
  return data;
}

export async function GetAllDecks(id) {
  return null;
}

/**
 *
 * @param {*} deck A deck object
 * @returns
 */
export async function UploadDeck(deck) {
  //use deck.name
  //stringify the deck
  //upload deck: deck.name
  //upload deckString: json.stringify(deck);

  return null;
}
