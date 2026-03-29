import { baseProcedure, createTRPCRouter } from '../init';
import { z } from 'zod';
// import { billingRouter } from './billing';
// import { generationsRouter } from './generations';
import { voicesRouter } from './voices';
export const appRouter = createTRPCRouter({
    voices: voicesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;