import { Card } from ".";

const CardGrid = () => {
  const data = [
    {
      title: "the one ring",
      id: "000",
      collected: true,
      imageSrc: "https://www.mtgpics.com/pics/big/uni/044.jpg",
    },
    {
      title: "the one ring",
      id: "000",
      collected: true,
      imageSrc: "https://www.mtgpics.com/pics/big/uni/045.jpg",
    },
    {
      title: "the one ring",
      id: "000",
      collected: true,
      imageSrc: "https://www.mtgpics.com/pics/big/uni/046.jpg",
    },
    {
      title: "the one ring",
      id: "000",
      collected: true,
      imageSrc: "https://www.mtgpics.com/pics/big/uni/047.jpg",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 px-5 pt-5">
      {data?.map((item) => (
        <Card
          title={item.title}
          number={item.id}
          collected={item.collected}
          imageSrc={item.imageSrc}
        />
      ))}
    </div>
  );
};

export default CardGrid;
