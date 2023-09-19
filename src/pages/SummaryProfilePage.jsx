
import { Box } from "@mui/material"
import { SummaryProfileCard } from "../components/SummaryProfileCard"


export const SummaryProfilePage = () => {

    const ProfileArea = () => {
        return (
            <SummaryProfileCard />
        )
    }

    return (
        <Box sx={{ minWidth: 120}}>
            <ProfileArea />
        </Box>
    )
}