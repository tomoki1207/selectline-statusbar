# selectline-statusbar

Displays selected lines count in status bar.

![ScreenShot](https://raw.githubusercontent.com/tomoki1207/selectline-statusbar/images/screenshot.png)

## Usage
When you selected more 2 lines, selected lines count will be displayed in status bar.
The display format can be changed via user/workspace preferences.
1. File > Preferences > User Setting (or Workspace Setting)
1. Adds the following key-value.
  - `"selectline.displayFormat": "Selected %d Lines"`
  - Display format can be use https://nodejs.org/api/util.html#util_util_format_format.
  - Argument into display format is line count only.
  - You can display with [octicon](https://octicons.github.com/) like `$(three-bars) Selected line: %d`.

## Change log
- 0.0.1 (2016-10-6): Initial release
- 0.0.2 (2017-3-3): Add an icon and some configurations

## License
Please see [LICENSE]("./LICENSE").