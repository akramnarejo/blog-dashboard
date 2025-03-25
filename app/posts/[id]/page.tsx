'use client'
import { useGetPostQuery } from '../../../lib/api'
import { useParams } from 'next/navigation'
import { Typography, CircularProgress, Button } from '@mui/material'
import Author from '@/app/components/Author'
import Link from 'next/link'

export default function PostDetailPage() {
  const { id } = useParams()
  const postId = Number(id)
  const { data: post, isLoading, isError } = useGetPostQuery(postId)

  if (isLoading) return <CircularProgress />
  if (isError || !post) return <Typography>Post not found.</Typography>

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{textTransform: 'capitalize'}}>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {<Author id={+post.userId} />}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {post.body + " " + post.body + " " + post.body}
      </Typography>
      <Button variant="contained" size='small' sx={{marginTop: 4}}><Link href="/" >Back</Link></Button>
    </div>
  )
}
