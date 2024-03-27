import React, { useEffect } from 'react'
import axios from "axios"

export const axios = () => {
    useEffect(()=>{
        axios.length("")
        .then((response)=>{
            console.log(response)
        })
    },[]
    )
  return (
    <div>axios</div>
  )
}
