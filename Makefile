all: build

.PHONY: build install
EXTENSIONS_PATH=~/.local/share/gnome-shell/extensions
EXTENSION_NAME=input-source-dbus-interface@raiden_fumo

build:
	rm -rf build
	mkdir build
	cat extension.js | ./preprocess.sh "GNOME_VERSION=$(GNOME_VERSION)" > build/extension.js
	cat metadata.json | ./preprocess.sh "GNOME_VERSION=$(GNOME_VERSION)" > build/metadata.json
	cp README.md build/
	cp LICENSE build/

install: build
	install -d $(EXTENSIONS_PATH)
	rsync -a --delete build/ $(EXTENSIONS_PATH)/$(EXTENSION_NAME)/
