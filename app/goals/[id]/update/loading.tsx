import { Grid } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loading = () => {
  return (
    <Grid columns={'2'}>
      <div className="max-w-xl">
        {/* Error messages */}

        <Skeleton className="mb-4" height={30} />

        <form className="space-y-4">
          {/* Title */}
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton className="mt-6" height={350} />
          {/* Deadline */}
        </form>
      </div>
      <Skeleton height={350} width={'60%'} />
    </Grid>
  )
}

export default loading
