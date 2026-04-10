import {
  schemesSchema,
  schemeRateResourceListSchema,
  createInvestmentSchema,
  investmentFilterSchema,
  investmentListSchema,
  investmentIdSchema,
  investmentSchema,
  updateInvestmentSchema,
} from "@app/schemas/schemes";

import { protectedProcedure } from "#app/trpc";
import InvestmentService from "#procedures/investment/service";

const investment = {
  /**
   * Investment schemes.
   */
  scheme: {
    /**
     * Get all schemes.
     */
    list: protectedProcedure
      .output(schemesSchema)
      .query(async () => {
        const data = await InvestmentService.schemeList();
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

  /**
   * List investments of user.
   */
  list: protectedProcedure
    .input(investmentFilterSchema)
    .output(investmentListSchema)
    .query(async ({ ctx, input }) => {
      const data = await InvestmentService.list(ctx.user.id, input);
      return data;
    }),

  /**
   * Get user investment by id.
   */
  getById: protectedProcedure
    .input(investmentIdSchema)
    .output(investmentSchema)
    .query(async ({ ctx, input }) => {
      const data = await InvestmentService.getById(ctx.user.id, input);
      return data;
    }),

  /**
   * Update an investment.
   */
  update: protectedProcedure
    .input(updateInvestmentSchema)
    .mutation(async ({ ctx, input }) => {
      await InvestmentService.update(ctx.user.id, input);
    }),

  /**
   * Delete investment.
   */
  delete: protectedProcedure
    .input(investmentIdSchema)
    .mutation(async ({ ctx, input }) => {
      await InvestmentService.delete(ctx.user.id, input);
    }),
};

export default investment;
