interface ICard {
  name: string;
  id: number;
  collected: boolean;
  type: string;
  imageSrc: string;
}

const Card = ({ name, id, collected, type, imageSrc }: ICard) => {
  return (
    <div className="flex flex-col items-center justify-center card bg-base-100 h-125 w-80 shadow-sm border-1">
      <div className="card-body flex flex-col items-center justify-center text-center">
        <h2
          className="text-lg cursor-pointer underline hover:text-[#bbb]"
          onClick={() => console.log(`${name} clicked`)}
        >
          {name} {collected}
        </h2>
        <h2 className="text-sm">
          #{id} - {type}
        </h2>
      </div>

      <img
        className={`${
          !collected && "grayscale"
        } w-[200px] rounded-[10px] mb-10 mt-5 hover:scale-103 transition-transform duration-200 shadow-2xl shadow-[rgba(59,130,246,0.15)] cursor-pointer`}
        src={imageSrc}
        alt={name}
      />
    </div>
  );
};

export default Card;
