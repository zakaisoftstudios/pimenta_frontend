import React from 'react';
import { DashboardCard } from '../styles'
import Typography from '@material-ui/core/Typography';
import Title from './Title';

export default function Card({title, quantity, percentage}) {
  return (
    <DashboardCard>
      <Title>{title}</Title>
      <Typography component="span" variant="h4">
        {quantity}
      </Typography>
      {percentage && (
        <Typography component="span" color="textSecondary">
          %{percentage}
        </Typography>
      )}
    </DashboardCard>
  )
}
