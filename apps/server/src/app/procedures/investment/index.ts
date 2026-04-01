import { protectedProcedure } from "#app/trpc";

import {
  schemesSchema,
  schemeRateResourceListSchema,
  createInvestmentSchema,
} from "@app/schemas/schemes";

import InvestmentService from "#procedures/investment/service";

const investment = {
  /**
   * Investment schemes.
   */
  scheme: {
    /**
     * Get schemes.
     */
    get: protectedProcedure
      .output(schemesSchema)
      .query(async () => {
        const data = await InvestmentService.schemes();
        return data;
      }),

    /**
     * Get interest rates.
     */
    rates: protectedProcedure
      .output(schemeRateResourceListSchema)
      .query(async () => {
        const data = await InvestmentService.schemeRates();
        return data;
      }),
  },

  /**
   * Create an investment.
   */
  create: protectedProcedure
    .input(createInvestmentSchema)
    .mutation(async ({ ctx, input }) => {
      await InvestmentService.createInvestment(ctx.user.id, input);
    }),
};

export default investment;
