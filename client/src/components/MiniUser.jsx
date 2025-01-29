import { Avatar, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const MiniUser = ({ username, bio, img, last, link }) => {
  return (
    <Link style={{textDecoration:'none',display:'flex',width:'100%'}} to={`/dashboard`}>
      <Grid item margin={{ xs: 1, md: 3 }} sx={{ textDecoration: 'none' }} >
        <Card
          sx={{ border: 0, background:'none' }}
          variant='outlined'
        >
          <Grid container>
            <Grid item>
              <Avatar sx={{ width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 }, margin: 'auto' }} alt="Remy Sharp" src={img ? img : "./logo512.png"} />
              <Typography
                display={{
                  xs: 'none',
                  md: 'block'
                }}
                textAlign="center"
                variant='body1'>{username ? username : '29apo29'}</Typography>
            </Grid>
            <Grid
              Item
              sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', paddingLeft: 2 }}>
              <Typography
                display={{
                  xs: 'block',
                  md: 'none'
                }}
                textAlign="center"
                variant='body1'>{username ? username : '29apo29'}</Typography>
              <Typography
                display={{
                  xs: 'none',
                  md: 'flex'
                }} variant='body2'>{bio ? bio : ''}</Typography>
              <Typography
                display={{
                  xs: 'none',
                  md: 'flex'
                }} variant='subtitle2'>{last ? last : ''}</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Link>
  )
}

export default MiniUser