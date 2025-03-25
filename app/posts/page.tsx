"use client";
import { useGetPostsQuery } from "@/lib/api";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid2 as Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Posts() {
  const { data: posts, isLoading, isError } = useGetPostsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Error loading posts.</Typography>;

  const totalPages: number = posts ? Math.floor(posts?.length / 10) : 0;

  function handlePagination(paginate: string) {
    if (paginate === "next") {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    } else if (paginate === "prev") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  }
  return (
    <Box component={'div'}>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Blog Posts
        </Typography>
        <Link href="/posts/create">
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            Add New Post
          </Button>
        </Link>
      </Box>
      <Grid container spacing={2} columns={{ xs: 12, md: 6 }}>
        {posts
          ?.slice(currentPage * 10 - 10, currentPage * 10)
          .sort((a, b) => b.id - a.id)
          ?.map((post) => (
            <Grid key={post.id} size={{ xs: 12, md: 3 }}>
              <Card
                sx={{
                  height: '150px',
                  backgroundColor: "#f1f1f1",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ textTransform: "capitalize" }}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="body1" noWrap>
                    {post.body}
                  </Typography>
                  <Link href={`/posts/${post.id}`} passHref>
                    <Button size="small" sx={{ mt: 1 }}>
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Button
          onClick={() => handlePagination("prev")}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <Typography sx={{ mx: 2 }}>
          {currentPage}/{totalPages}
        </Typography>
        <Button
          onClick={() => handlePagination("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
