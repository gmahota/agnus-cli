//#!/usr/bin/env node

const { Command } = require("commander");

const {
  makeTaskCommand,
  makeExportCommand,
  makeImportCommand,
  makeConfigCommand,
} = require("./commands");

const MessageColorEnum = require("./shared/enums/MessageColorEnum");

async function cli() {
  try {
    const program = new Command();
    program
      .version(
        "1.0.0",
        "-v, --version",
        "output Agnus Cli Master's current version"
      )
      .description(
        "Agnus Cli Master is a minimalistic command-line todo list that increases your productivity"
      )
      .addCommand(await makeTaskCommand())
      .addCommand(await makeExportCommand())
      .addCommand(await makeImportCommand())
      .addCommand(await makeConfigCommand())
      .allowUnknownOption(false)
      .allowExcessArguments(false);

    program.parse(process.argv);
  } catch (error) {
    console.error(MessageColorEnum.ERROR(error));
  }
}

module.exports = cli;
