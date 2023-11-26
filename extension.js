/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import Gio from 'gi://Gio';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import {getInputSourceManager} from 'resource:///org/gnome/shell/ui/status/keyboard.js';

const DbusInterface = `<node>
    <interface name="raiden_fumo.InputSources">
        <method name="Set">
            <arg type="s" direction="in" name="id" />
            <arg type="b" direction="out" name="success"/>
            <arg type="s" direction="out" name="error"/>
        </method>
        <method name="Get">
            <arg type="s" direction="out" name="active_source_id"/>
        </method>
        <method name="List">
            <arg type="s" direction="out" name="input_methods"/>
        </method>
    </interface>
</node>
`;

class LayoutManager {
    Set(id) {
        const inputSources = getInputSourceManager().inputSources;
        // We do loop. Not a problem if you don't have a thousand input sources,
        // and tracking potential changes to the sources settings
        // or using numeric values from input source order doesn't sounds like fun
        for (var key in inputSources) {
            var inputSource = inputSources[key];
            if (inputSource.id == id) {
                inputSource.activate();
                return [true, `Activated input source '${inputSource.id}'`];
            }
        }
        return [false, `Coudln't find input source '${id}' in the list: '${this.List()}'`];
    }

    Get() {
        const manager = getInputSourceManager();
        var ret = [];
        for (var key in manager) {
            ret.push(key);
        }
        return getInputSourceManager().currentSource.id;
    }

    List() {
        const inputSources = getInputSourceManager().inputSources;
        var ret = [];
        for (var key in inputSources) {
            var inputSource = inputSources[key];
            ret.push(inputSource.id);
        }
        return ret.join(", ");
    }
}

export default class InputSourceInterface extends Extension {
    enable() {
        this._layoutManager = new LayoutManager();
        this._dbusObject = Gio.DBusExportedObject.wrapJSObject(DbusInterface, this._layoutManager);
        this._dbusObject.export(Gio.DBus.session, '/raiden_fumo/InputSources');
    }

    disable() {
        if (this._dbusObject) this._dbusObject.unexport();
        this._dbusObject = null;
        this._layoutManager = null;
    }
}
