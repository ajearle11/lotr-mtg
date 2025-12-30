import { useQuery } from "@tanstack/react-query";
import type { TCard } from "../types";
import { useParams } from "react-router";
import apiFetch from "../utils/api";
import { IndividualCard } from "../components";

export default function IndividualCardPage() {
  const params = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["card"],
    queryFn: () => apiFetch<TCard[]>(`/cards/id/${params.id}`),
  });

  if (isLoading) return <p>Loading</p>;

  if (!data) return <p>Not found</p>;
  
  if (error) return <p>Not found</p>;

  return <IndividualCard card={data[0]} />;
}
