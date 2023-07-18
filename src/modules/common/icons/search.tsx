import React from "react"
import { IconProps } from "types/icon"


const Search: React.FC<IconProps> = ({
  size = "16",
  color = "currentColor",
  ...attributes
}) => {

  

  return (
    
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M20.4696 21.5303C20.7625 21.8232 21.2373 21.8232 21.5302 21.5303C21.8231 21.2374 21.8231 20.7626 21.5302 20.4697L20.4696 21.5303ZM17.1802 16.1197C16.8873 15.8268 16.4125 15.8268 16.1196 16.1197C15.8267 16.4126 15.8267 16.8874 16.1196 17.1803L17.1802 16.1197ZM18.25 11C18.25 15.0041 15.0041 18.25 11 18.25V19.75C15.8325 19.75 19.75 15.8325 19.75 11H18.25ZM11 18.25C6.99594 18.25 3.75 15.0041 3.75 11H2.25C2.25 15.8325 6.16751 19.75 11 19.75V18.25ZM3.75 11C3.75 6.99594 6.99594 3.75 11 3.75V2.25C6.16751 2.25 2.25 6.16751 2.25 11H3.75ZM11 3.75C15.0041 3.75 18.25 6.99594 18.25 11H19.75C19.75 6.16751 15.8325 2.25 11 2.25V3.75ZM21.5302 20.4697L17.1802 16.1197L16.1196 17.1803L20.4696 21.5303L21.5302 20.4697Z"
        fill={color}
      />
    </svg>
    
  )
}

export default Search
