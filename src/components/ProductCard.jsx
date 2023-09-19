import { Avatar, Card, CardContent, CardHeader, Typography, Grid, Chip } from "@mui/material"
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

export const ProductCard = (props) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={props.name} />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img src={props.image} width="375"/>
                    </Grid>  
                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom>
                            {props.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Chip icon={<MonetizationOnIcon/>} label={props.price} color="success" />
                    </Grid>
                    <Grid item xs={7}>
                        <Chip icon={<Grid3x3Icon/>} label={'SKU: ' + props.sku} color="success" />
                    </Grid>             
                </Grid>
            </CardContent>

        </Card>
    )
}