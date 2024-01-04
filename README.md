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
```
You'll see output like
```
('us, ru, anthy',)
```

Then you assign key bindings for commands like this:
```
$ gdbus call --session --dest org.gnome.Shell --object-path /raiden_fumo/InputSources --method raiden_fumo.InputSources.Set anthy
```

You can get current input source by executing:
```
$ gdbus call --session --dest org.gnome.Shell --object-path /raiden_fumo/InputSources --method raiden_fumo.InputSources.Get
```

# GNOME Shell version compatibility
Should work on all versions from 3.28 to 45 (built with preprocessor for compatibility).
It will most likely still work on earlier versions, but it wasn't tested on them.

# Building & installation
To support both ECMAScript modules (GNOME 45+) and old `imports` approach, custom preprocessor is used.
Preprocessor is written in Lua, so if you want to build the extension, you'll have to have Lua installed.

The entire build/installation process:
```
$ git clone git@github.com:herrscher-of-sleeping/gnome-input-source-dbus-interface.git
$ cd gnome-input-source-dbus-interface
$ git submodule update --init
# If you want to have built extension in build/ directory:
# for GNOME 45:
$ make build GNOME_VERSION=45
# for older GNOME versions:
$ make build

# If you want to install this into your extensions directory:
# WARNING: this installs extension in ~/.local/share/gnome-shell/extensions
# if you have different paths (even though I'm unaware of such configurations),
# build extension and install it from build/ directory manually
# for GNOME 45:
$ make install GNOME_VERSION=45
# for older GNOME versions:
$ make install
```

# Eval GJS note
This extension was initially based on [Eval GJS](https://github.com/ramottamado/eval-gjs),
deprecation of which has led to developing this one.
