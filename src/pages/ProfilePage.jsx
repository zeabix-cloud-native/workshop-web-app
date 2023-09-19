import { useState } from "react"
import { ProfileCard } from "../components/ProfileCard"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { ProductCard } from "../components/ProductCard"

const productDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


export const ProfilePage = () => {
    const [id, setId] = useState("")


    

    const ProfileArea = () => {
        if (id === "") {
            return (
                <h3>Select Profile ID</h3>
            )
        }

        return (
            <ProfileCard id={id} />
        )
    }

    const handleUserIDSelect = (event) => {
        setId(event.target.value)
    }

    return (
        <Box sx={{ minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel id="id-select-label">User ID</InputLabel>
            <Select
                labelId="id-select-label"
                value={id}
                label="User ID"
                onChange={ handleUserIDSelect }
            >
                <MenuItem value="3f4024c6-141b-45f9-9701-c9411c8a36a0">3f4024c6-141b-45f9-9701-c9411c8a36a0</MenuItem>
                <MenuItem value="f33d2076-83b9-4957-8e80-565f3a815373">f33d2076-83b9-4957-8e80-565f3a815373</MenuItem>
                
            </Select>
        </FormControl>
        <ProfileArea />
        <ProductCard price="31900.00" name="iPhone 15" description={productDesc} image="https://cdn.thewirecutter.com/wp-content/media/2022/10/whichiphone-2048px-2681-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024&dpr=2" />
        <ProductCard price="29900.00" name="Samsung Galaxy S23 " description={productDesc} image="https://media.cnn.com/api/v1/images/stellar/prod/230308120048-underscored-galaxy-s23-ultra-camera-lead.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp" />
        </Box>
    )
}