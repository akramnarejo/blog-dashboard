'use client'
import { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import { useCreatePostMutation } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function AddPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [createPost, { isLoading }] = useCreatePostMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPost({ title, body }).unwrap()
      router.push('/')
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Post
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Body"
        multiline
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        sx={{ mb: 2 }}
        required
      />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? <CircularProgress size={20} /> : 'Submit'}
      </Button>
    </Box>
  )
}
