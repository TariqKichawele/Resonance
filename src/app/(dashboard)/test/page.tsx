import React, { Suspense } from 'react'
import { HealthCheck } from './health-check'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary';

const Page = () => {
    prefetch(trpc.health.queryOptions());
  return (
    <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong...</div>}>
            <Suspense fallback={<div>Loading...</div>}>
                <HealthCheck />
            </Suspense>
        </ErrorBoundary>
    </HydrateClient>
  )
}

export default Page