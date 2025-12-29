import { useQuery } from "@tanstack/react-query";
import type { TCard } from "../types";
import { useParams } from "react-router";
import apiFetch from "../utils/api";

export default function IndividualCardPage() {
  const params = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["images"],
    queryFn: () => apiFetch<TCard[]>(`/cards/id/${params.id}`),
  });

  if (isLoading) return <p>Loading</p>;

  if (error) return <p>Not found</p>;

  return (
    <div className="flex flex-col w-screen justif-center items-center px-10 text-center">
      <h1 className="text-3xl">{data[0].name}</h1>
      <p>#{data[0].id}</p>
      <img
        className={`w-[400px] rounded-[10px] mb-10 mt-5 hover:scale-103 transition-transform duration-200 shadow-2xl shadow-[rgba(59,130,246,0.15)] cursor-pointer`}
        src={data[0].image}
        alt={data[0].name}
      />
      <p>{data[0].artist}</p>
      <p>{data[0].text}</p>
      <p className="italic">"{data[0].flavorText}"</p>
    </div>
  );
}
