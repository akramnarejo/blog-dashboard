import { useGetUserQuery } from "@/lib/api";
import { Typography } from "@mui/material";

export default function Author({ id }: { id: number }) {
  const { data: user, isLoading, isError } = useGetUserQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <span>Unknow</span>;
  return <Typography>By: {user.name}</Typography>;
}
