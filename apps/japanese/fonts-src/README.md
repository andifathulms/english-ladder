# Japanese source fonts

`npm run fonts:fetch` downloads these (about 27 MB, not committed) and checks their SHA-256;
`npm run fonts:subset` subsets them into `styles/fonts-ja/` at build time.

| File | Font | Version | Licence |
|---|---|---|---|
| `KleeOne-Regular.ttf`, `KleeOne-SemiBold.ttf` | [Klee One](https://github.com/fontworks-fonts/Klee) (Fontworks) | commit `8b05327` | SIL Open Font License 1.1 |
| `NotoSansJP-Regular.otf`, `NotoSansJP-Medium.otf` | [Noto Sans JP](https://github.com/notofonts/noto-cjk) (SubsetOTF) | Sans2.004 | SIL Open Font License 1.1 |

The subset files are served under new family names (`Ladder Klee One`, `Ladder Noto JP`), as the OFL
asks of modified versions. Never use the Mandarin app's Chinese fonts for Japanese: glyph shapes
differ (直, 骨, 角).
