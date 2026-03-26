import seedSchemes from "#db/seed/schemes";
import seedSchemeRates from "#db/seed/schemeRates";

const seeder = process.argv[2];

switch (seeder) {
  case "schemes":
    await seedSchemes();
    break;
  case "scheme_rates":
    await seedSchemeRates();
    break;
  default:
    console.error("Invalid Seed");
    process.exit(1);
}

process.exit(0);
