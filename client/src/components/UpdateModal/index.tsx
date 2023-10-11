import "./index.css";
import { Button } from "../../components/";
import { useAppContext } from "../../contexts/";
import { ApiResponseDataArray } from "../../interfaces/";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setMultiClick } from "../../store/multiClickReducer";

const UpdateModal: React.FC<{ className: string }> = ({ className }) => {
  const { user, setUser } = useAppContext();
  const multiClick = useSelector(
    (state: RootState) => state.multiClick.multiClick
  );
  const dispatch = useDispatch();

  const addCardsToUser = async (): Promise<void> => {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({ newCard: multiClick }),
    };

    const response = await fetch(
      `https://lotr-mtg-collector.onrender.com/users/${user.username}`,
      options
    );
    const data: ApiResponseDataArray = await response.json();
    setUser({ ...user, cards: data });

    dispatch(setMultiClick([]));
  };

  return (
    <div className={className}>
      <div className="update-modal">
        <p>
          You have selected {multiClick.length}{" "}
          {multiClick.length === 1 ? "card" : "cards"}
        </p>
        <Button text="Update Cards" onClick={() => addCardsToUser()} />
        <Button text="Reset" onClick={() => dispatch(setMultiClick([]))} />
      </div>
    </div>
  );
};

export default UpdateModal;
