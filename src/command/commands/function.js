/*
 *
 */
'use strict';

var { createTooltip, returnEmptyArr } = require('../command_util');

(function(c) {
    var COMMAND_TYPES = Entry.STATIC.COMMAND_TYPES;

    c[COMMAND_TYPES.funcEditStart] = {
        do: function(funcId) {
            var commander = Entry.commander;
            if (commander) {
                var { functionId } = commander.getStorage() || {};
                if (functionId) {
                    funcId = functionId;
                }
            }
            Entry.playground.changeViewMode('code');
            var blockMenu = Entry.variableContainer._getBlockMenu();
            if (blockMenu.lastSelector != 'func') {
                blockMenu.selectMenu('func');
            }
            Entry.variableContainer.createFunction({ id: funcId });
        },
        state: function(funcId) {
            var commander = Entry.commander;
            if (commander) {
                var { functionId } = commander.getStorage() || {};
                if (functionId) {
                    funcId = functionId;
                }
            }
            return [funcId];
        },
        log: function(funcId) {
            var commander = Entry.commander;
            if (commander) {
                var { functionId } = commander.getStorage() || {};
                if (functionId) {
                    funcId = functionId;
                }
            }
            return [['funcId', funcId]];
        },
        restrict(data, domQuery, callback) {
            Entry.commander.setStorage({
                functionId: data.content[1][1],
            });

            var { content: contentData, tooltip: { title, content } } = data;
            return createTooltip(title, content, domQuery, callback);
        },
        validate: false,
        recordable: Entry.STATIC.RECORDABLE.SUPPORT,
        dom: ['variableContainer', 'functionAddButton'],
        undo: 'funcEditCancel',
    };

    c[COMMAND_TYPES.funcEditCancel] = {
        do: function() {
            Entry.getMainWS().setMode(Entry.Workspace.MODE_BOARD, 'cancelEdit');
        },
        state: returnEmptyArr,
        log: returnEmptyArr,
        recordable: Entry.STATIC.RECORDABLE.SUPPORT,
        dom: ['playground', 'overlayBoard', 'cancelEditButton'],
        undo: 'funcEditStart',
    };

    c[COMMAND_TYPES.funcCreate] = {
        do: function() {
            var WS = Entry.getMainWS();
            WS.setMode(Entry.Workspace.MODE_BOARD, 'save');
        },
        state: returnEmptyArr,
        log: returnEmptyArr,
        recordable: Entry.STATIC.RECORDABLE.SUPPORT,
        dom: ['playground', 'overlayBoard', 'saveButton'],
        undo: 'funcEditStart',
    };
})(Entry.Command);
