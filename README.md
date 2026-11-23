# Welcome to Funkin IDE's template project

[Kade's V-Slice docs](https://thekade.net/funkin-cookbook/)

This is a simple template to get you started with V-Slice modding.
Most (if not all) information related to the mod structure is documented across various chapters in the official documentation.


## Getting your funkin mod to **funk**

To see your mod in action head over to "Run and Debug" section of your IDE, which has all the necessary tasks to let you playtest your mod:

- `Just run FNF` Starts up your engine (stopping this task will also stop the game. Useful in some cases).
- `Copy & Run FNF mod` Copies your mod to the configured FNF instance (debugger will ask for it if it was not set) and launches it.
- `Copy & Run Mobile FNF` Same as `Copy & Run FNF mod` but targets connected Android phone (via adb).

# About DebugWindow Mod

- This Module is for v-slice fnf (idk about the desktop).

## What's gets displayed
- The Module shows two windows `STATUS` and `LOG HISTORY`
- `STATUS` Window shows the FPS, GC MEM, Stage Name, Difficulty, Song Name, Player (Boyfriend), Opponent (Dad), and Player Vocals Lists.
- `LOG HISTORY` Window shows the all the logs. This Module logs the path of the Player Voice Lists during `onCountdownStart()`.

## Customizations
- You can show or hide the Module, change opacity, and status refresh interval at the Preferences page.

## Using as a debugging tool
- If you want to use this for modding, you can disable/enable default logs by using `disableDefaultLogs()` or `enableDefaultLogs()`.
- The public functions of this Module are `disableDefaultLogs()`, `enableDefaultLogs()`, `log()` and `clearLogs()`.

```json
{
  "title": "title Name",
  "id": "id",
  "description": "description",
  "contributors": [
    {
      "name": "name",
      "role": "role",
      "url": "url"
    }
  ],
  "dependencies": {
    "debugwindow": "version (ex. 1.2.1)"
  },
  "api_version": "0.8.6",
  "mod_version": "1.0.0",
  "license": "Apache-2.0"
}
```
- In your `_polymod_meta.json` file, add `debugwindow` and the `latest version` under the `dependencies`.

```haxe
public function log(message:String):Void
```
`log()` will display the log to `LOG HISTORY` (can only keep 10 recent logs).

```haxe
public function clearLogs():Void
```
`clearLogs()` will clear all the logs to `LOG HISTORY`.

```haxe
public function enableDefaultLogs():Void
public function disableDefaultLogs():Void
```
`disableDefaultLogs()` or `enableDefaultLogs()` will disable/enable default logs.

- To get the Module, create a variable name, then initialize it inside `onSongLoaded()` or `onCountdownStart()` so that you can use it outside.

```haxe
// declare variable
var variableName:Null<DebugWindow>;
// or this
var variableName:Null<Module>;

// store debug window module (cast it to DebugWindow class)
var variableName:Null<DebugWindow> = cast ModuleHandler.getModule("DebugWindow");
// or this
var variableName:Null<Module> = ModuleHandler.getModule("DebugWindow");
```
