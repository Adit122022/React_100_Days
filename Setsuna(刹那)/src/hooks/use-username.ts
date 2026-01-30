import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

const ANIMALS = ["Cat", "Dog", "Mouse", "Rabbit", "Turtle", "Hamster", "Parrot", "Penguin", "Panda", "Pig"]

const STORAGE_KEY = "cat_username"

const generatedUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
  return `anonymous-${word}-${nanoid(5)}`
}
export const useUsername = ()=>{
      const [username, setUsername] = useState("")
        useEffect(() => {
    const main = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUsername(stored);
        return
      }
      const generated = generatedUsername()
      localStorage.setItem(STORAGE_KEY, generated)
      setUsername(generated)
    }
    main()
  }, [])

   return { username }
}