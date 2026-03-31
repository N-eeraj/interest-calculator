import { protectedProcedure } from "#app/trpc";

import { schemeRateResourceListSchema } from "@app/schemas/schemes";
import InvestmentService from "#procedures/investment/service";

const investment = {
  /**
   * Investment schemes.
   */
  scheme: {
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
};

export default investment;
