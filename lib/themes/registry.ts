import { ThemeConfig } from "./types";
import { midnight } from "./themes/midnight";
import { clean } from "./themes/clean";
import { paper } from "./themes/paper";
import { hackbuild } from "./themes/hackbuild";
import { terminal } from "./themes/terminal";
import { shibuyaPunk } from "./themes/shibuya-punk";
import { pastelDream } from "./themes/pastel-dream";
import { forest } from "./themes/forest";
import { brutalist } from "./themes/brutalist";
import { executive } from "./themes/executive";
import { retrowave } from "./themes/retrowave";
import { nordic } from "./themes/nordic";

const themes: ThemeConfig[] = [
  midnight,
  clean,
  paper,
  hackbuild,
  terminal,
  shibuyaPunk,
  pastelDream,
  forest,
  brutalist,
  executive,
  retrowave,
  nordic,
];

export function getAllThemes(): ThemeConfig[] {
  return themes;
}

export function getTheme(id: string): ThemeConfig | undefined {
  return themes.find((theme) => theme.id === id);
}
