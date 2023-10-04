import "./index.css";
import { Button } from "../../components/";
import { useAppContext } from "../../contexts/";
import { ApiResponseDataArray } from "../../interfaces/";

const UpdateModal = () => {
  const { multiClickArray, setMultiClickArray, user, setUser } =
    useAppContext();

  const addCardsToUser = async (): Promise<void> => {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({ newCard: multiClickArray }),
    };

    const response = await fetch(
      `http://localhost:3000/users/${user.username}`,
      options
    );
    const data: ApiResponseDataArray = await response.json();
    setUser({ ...user, cards: data });

    setMultiClickArray([]);
  };

  return (
    <div className="update-modal-container">
      <div className="update-modal">
        <p>
          You have selected {multiClickArray.length}{" "}
          {multiClickArray.length === 1 ? "card" : "cards"}
        </p>
        <Button text="Update Cards" onClick={() => addCardsToUser()} />
        <Button text="Reset" onClick={() => setMultiClickArray([])} />
      </div>
    </div>
  );
};

export default UpdateModal;
