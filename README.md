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
- The Module shows two windows "STATUS" and "DEBUG CONSOLE"
- STATUS Window shows the FPS, GC MEM, Stage Name, Difficulty, Song Name, Player (Boyfriend), Opponent (Dad), and Player Vocals Lists.
- DEBUG CONSOLE Window shows the all the logs. This Module logs the path of the Player Voice Lists during `onCountdownStart()`.

## Customizations
- You can show or hide the Module, change opacity, and status refresh interval at the Preferences page.

## Using as a debugging tool
- If you want to use this for modding, you can remove the default `log()` in `onCountdownStart()` at `DebugWindow.hxc`.
- The public functions of this Module are `log()` and `clearLogs()`.

```haxe
public function log(message:String):Void
```
`log()` will display the log to DEBUG CONSOLE (can only keep 8 recent logs).

```haxe
public function clearLogs():Void
```
`clearLogs()` will clear all the logs to DEBUG CONSOLE.

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
