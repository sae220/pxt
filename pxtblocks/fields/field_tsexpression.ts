/// <reference path="../../built/pxtlib.d.ts" />

import * as Blockly from "blockly";
import { FieldCustom } from "./field_utils";


export class FieldTsExpression extends Blockly.FieldTextInput implements FieldCustom {
    public isFieldCustom_ = true;
    protected pythonMode = false;


    /**
     * Same as parent, but adds a different class to text when disabled
     */
    public updateEditable() {
        let group = this.fieldGroup_;
        if (!this.EDITABLE || !group) {
            return;
        }
        if (this.sourceBlock_.isEditable()) {
            pxt.BrowserUtils.addClass(group, 'blocklyEditableText');
            pxt.BrowserUtils.removeClass(group, 'blocklyGreyExpressionBlockText');
            (this.fieldGroup_ as any).style.cursor = this.CURSOR;
        } else {
            pxt.BrowserUtils.addClass(group, 'blocklyGreyExpressionBlockText');
            pxt.BrowserUtils.removeClass(group, 'blocklyEditableText');
            (this.fieldGroup_ as any).style.cursor = '';
        }
    }

    public setPythonEnabled(enabled: boolean) {
        if (enabled === this.pythonMode) return;

        this.pythonMode = enabled;
        this.forceRerender();
    }

    getText() {
        return this.pythonMode ? pxt.Util.lf("<python code>") : this.getValue();
    }

    applyColour() {
        if (this.sourceBlock_ && this.getConstants()?.FULL_BLOCK_FIELDS) {
            if (this.borderRect_) {
                this.borderRect_.setAttribute('stroke',
                    (this.sourceBlock_ as Blockly.BlockSvg).style.colourPrimary);
                this.borderRect_.setAttribute('fill',
                    (this.sourceBlock_ as Blockly.BlockSvg).style.colourPrimary);
            }
        }
    }
}