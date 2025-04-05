import { Facebook, WhatsApp } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import './footer.css'

const Footer = () => {
    return (
        <Box component='footer' className='Footer'>
            <Container>
                <Grid container justifyContent='center' alignItems='center'>
                    <Grid size={12}>
                        <Box className='Links'>
                            <Link to='https://facebook.com' target='_blank' rel='noopener noreferrer'>
                                <Facebook className='Facebook' />
                            </Link>
                            <Link to='https://wa.me' target='_blank' rel='noopener noreferrer'>
                                <WhatsApp className='Whatsapp' />
                            </Link>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant='body2' className='TextFooter'>
                            Material-UI ©{new Date().getFullYear()} Created by Alvaro Peña
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer