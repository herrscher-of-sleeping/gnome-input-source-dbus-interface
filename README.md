# Keyboard Layout D-Bus Interface
A GNOME extension that provides D-Bus interface to switching input sources,
with 3 methods:
* Set: set current input method
* Get: get current input method
* List: get list of available input methods

Main purpose of this extension is to allow binding 1 shortcut to 1 input source,
for example:
* Ctrl+F1: source1
* Ctrl+F2: source2
* Ctrl+F3: source3

This can be more convenient than classic cycling through input sources when
you have 3 or more of them.

# Example usage
So how do you assign shortcuts? First you get a list of available input sources:
```
$ gdbus call --session --dest org.gnome.Shell --object-path /raiden_fumo/InputSources --method raiden_fumo.InputSources.List
('source1, source2, source3',)
```

Then you assign key bindings for commands like this:
```
$ gdbus call --session --dest org.gnome.Shell --object-path /raiden_fumo/InputSources --method raiden_fumo.InputSources.Set source1
```

You can get current input source by executing:
```
$ gdbus call --session --dest org.gnome.Shell --object-path /raiden_fumo/InputSources --method raiden_fumo.InputSources.Get
```

# Eval GJS note
This extension was initially based on [Eval GJS](https://github.com/ramottamado/eval-gjs),
deprecation of which has led to developing this one.
