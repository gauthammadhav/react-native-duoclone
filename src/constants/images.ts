/**
 * Centralized image imports — always import images from here.
 *
 * Usage:
 *   import { images } from "@/constants/images";
 *   <Image source={images.mascotWelcome} />
 */

const mascotLogo = require("@/assets/images/moscot-logo.png");
const mascotWelcome = require("@/assets/images/mascot-welcome.png");
const mascotAuth = require("@/assets/images/mascot-auth.png");
const earth = require("@/assets/images/earth.png");
const palace = require("@/assets/images/palace.png");
const treasure = require("@/assets/images/treasure.png");
const streakFire = require("@/assets/images/streak-fire.png");
const icon = require("@/assets/images/icon.png");

export const images = {
  mascotLogo,
  mascotWelcome,
  mascotAuth,
  earth,
  palace,
  treasure,
  streakFire,
  icon,
};
