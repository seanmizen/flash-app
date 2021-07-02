function DeckName({ deckName, setDeckName }) {
  return (
    <input
      type="text"
      required={true}
      placeholder="Deck Name"
      value={deckName}
      onChange={(e) => setDeckName(e.target.value)}
    />
  );
}

export default DeckName;
