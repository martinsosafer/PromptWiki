"use client"

import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {
    const router = useRouter()
    const { data: session } = useSession();
    const [allPost , setAllPosts] = useState([])
  useEffect(() => {
   
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setAllPosts(data)
    }

    if(session?.user.id) fetchPosts();
 }, [])
  
  
  const handleEdit = (post) => {
  router.push(`/update-prompt?id=${post._id}`)
}
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Confirmas que quieres eliminar esta prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,
          {
            method: "DELETE"
          });
        
        const filteredPost = allPost.filter((p) => p._id !== post._id)
        setAllPosts(filteredPost)
      } catch (error) {
        console.log(error)
      }
    }
    
  }
  return (
    <Profile
      name="Mi"
      desc="Bienvenido a tu perfil personal!"
      data={allPost}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
