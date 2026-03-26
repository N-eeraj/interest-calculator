import seedSchemes from "#db/seed/schemes";

const seeder = process.argv[2];

switch (seeder) {
  case "schemes":
    await seedSchemes();
    break;
  default:
    console.error("Invalid Seed");
    process.exit(1);
}

process.exit(0);
