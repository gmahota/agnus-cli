const { Command } = require("commander");

const ConfigController = require("../controllers/ConfigController");

async function makeConfigCommand() {
  const configController = new ConfigController();

  const configCommand = new Command("config")
    .usage("[options]")
    .addHelpText("after", "\nExample call: task-master config --no-colors")
    .description("Set configurations for the task-master CLI.")
    .option("--no-colors", "Disables colored output.")

    .action(async (options) => {
      configController.update({ enableTerminalColors: options.colors });
    });

  configCommand
    .command("add <url> <apiKey>")
    .usage("<url> <apiKey>")
    .addHelpText(
      "after",
      "\nExample call: agnus-cli config add http://localhost:1337/ AAAAAAAAAAA"
    )
    .description("Set configurations for the Agnus-CRM CLI.", {
      url: "Host URL.",
      apiKey: "Api Key.",
    })
    .action(async (url, apiKey) => {
      configController.updateServer(url, apiKey);
    });

  return configCommand;
}

module.exports = makeConfigCommand;
