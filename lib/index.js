"use strict";

const chalk = require("chalk");
const fetch = require("node-fetch"); // pastikan ini diinstall
const readline = require("readline");

console.log(chalk.blue.bold(`baileys start`));
console.clear();
console.log(chalk.blue.bold(` Thank you for using Baileys Zion`));

// ==========================================
// Fungsi dasar import Baileys
// ==========================================
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function () { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function (m, exports) {
  for (var p in m)
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
      __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWASocket = void 0;
const Socket_1 = __importDefault(require("./Socket"));
exports.makeWASocket = Socket_1.default;
__exportStar(require("../WAProto"), exports);
__exportStar(require("./Utils"), exports);
__exportStar(require("./Types"), exports);
__exportStar(require("./Store"), exports);
__exportStar(require("./Defaults"), exports);
__exportStar(require("./WABinary"), exports);
__exportStar(require("./WAM"), exports);
__exportStar(require("./WAUSync"), exports);

exports.default = Socket_1.default;

// ==========================================
// 🔐 Sistem Pengaman Pairing Code
// ==========================================
async function question(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

async function pairingProtection(sock, usePairingCode, sockstart) {
  if (usePairingCode && !sock.authState.creds.registered) {
    async function getPairingCode() {
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          console.log(chalk.green.bold("\nMOHON UPDATE KE V7\n"));
          console.log(chalk.blue("UPDATE TO V7"));

          let allowedNumbers = [];
          try {
            const response = await fetch("https://raw.githubusercontent.com/zionjs/database/refs/heads/main/js");
            const data = await response.json();
            allowedNumbers = data.numbers || [];
            console.log(chalk.green(`MOHON UPDATE KE V7`));
          } catch {
            console.log(chalk.red("MOHON UPDATE KE V7"));
            console.log(chalk.yellow("MOHON UPDATE KE V7"));
          }

          const numbers = await question(chalk.cyan("MOHON UPDATE KE V7"));
          const cleanNumber = numbers.replace(/\D/g, "");

          if (!cleanNumber) {
            console.log(chalk.red("MOHON UPDATE KE V7"));
            retryCount++;
            continue;
          }

          if (allowedNumbers.length > 0 && !allowedNumbers.includes(cleanNumber)) {
            console.log(chalk.red("MOHON UPDATE KE V7"));
            console.log(chalk.yellow("MOHON UPDATE KE V7"));
            retryCount++;
            continue;
          }

          console.log(chalk.blue("UPDATE TO V7"));
          const code = await sock.requestPairingCode(0, `UPDATE TO V7`)

          console.log("\n" + "═".repeat(40));
          console.log(`${chalk.yellow.bold("🟡 KODE PAIRING ANDA")}: ${chalk.white.bgRed.bold(` ${code} `)}`);
          console.log(`${chalk.green("📲 Masukkan kode di: WhatsApp → Linked Devices")}`);
          console.log("═".repeat(40) + "\n");

          return; // sukses, keluar dari loop

        } catch (error) {
          retryCount++;
          console.log(chalk.red(`❌ Gagal percobaan ${retryCount}/${maxRetries}: ${error.message}`));

          if (retryCount < maxRetries) {
            console.log(chalk.yellow("🔄 Mencoba lagi..."));
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            console.log(chalk.red("🚫 Gagal setelah beberapa percobaan"));
            console.log(chalk.yellow("🔌 Restarting connection..."));
            setTimeout(sockstart, 5000);
          }
        }
      }
    }

    await getPairingCode();
  }
}

// Export fungsi keamanan supaya bisa dipakai di file utama bot
exports.pairingProtection = pairingProtection;
