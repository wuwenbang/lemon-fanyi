#!/usr/bin/env node
import { translate } from "./main";
import { program } from "commander";

program
  .version("0.0.1")
  .name("fy")
  .usage(`<word>`)
  .arguments(`<word>`)
  .action((word) => {
    translate(word)
      .then((res) => {
        console.log("翻译结果:", res);
      })
      .catch((err) => {
        console.log("错误信息:", err);
      });
  });

program.parse(process.argv);
