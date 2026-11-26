# DebugWindow

- A simple debugging tool for users or modders. This mod is for v-slice fnf mobile.

## What's gets displayed
- `STATUS` Window shows the FPS, 1% Low FPS, GC MEM, Song (name + position / length), Stage Name, Difficulty, Player (Boyfriend), Girlfriend, and Opponent (Dad).
- `LOG HISTORY` Window shows the all the logs. This Module logs the path of the Player and Opponent Voice Lists during `onCountdownStart()`.

## Customizations
Choose what window mode (Basic or Full) and change opacity at the Preferences page.

## Using as a debugging tool
In your `_polymod_meta.json` file, add `debugwindow` and the `version` under the `dependencies`.
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

`log()` will display the log to `LOG HISTORY` (can only keep 10 recent logs).
```haxe
public function log(message:String):Void
```

`clearLogs()` will clear all the logs to `LOG HISTORY`.
```haxe
public function clearLogs():Void
```

`disableDefaultLogs()` or `enableDefaultLogs()` will disable/enable default logs.
```haxe
public function enableDefaultLogs():Void
public function disableDefaultLogs():Void
```

To get the Module, create a variable name, then initialize it inside `onSongLoaded()` or `onCountdownStart()` so that you can use it outside.
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
