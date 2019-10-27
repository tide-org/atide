'use babel';

export default class TideRequest {

    validActions = [
      'set_full_config_dictionary',
      'set_config_dictionary_item',
      'send_message_to_editor',
      'editor_function',
      'get_current_buffer_name',
    ];

    jsonObject = null;
    jsonString = null;

    constructor(str) {
      this.jsonString = str;
    }

    isJson() {
      try {
        this.jsonObject = JSON.parse(this.jsonString);
        return true;
      } catch (e) {
        return false;
      };
    };

    isForEditor() {
      return (this.jsonObject.receiver == 'editor');
    }

    isStructuredCorrectly() {
      let keys = Object.keys(this.jsonObject);
      if(['command', 'sender', 'receiver'].every((value) => keys.includes(value))) {
        let commandKeys = Object.keys(this.jsonObject.command);
        if(commandKeys.indexOf('action') != -1 && commandKeys.indexOf('value') != -1) {
          return true;
        }
      }
      return false;
    }

    isValidRequest() {
      return (this.isJson() && this.isStructuredCorrectly() && this.isForEditor() && this.isValidAction());
    }

    getEventId() {
      if (this.isValidRequest()) {
        return this.jsonObject.event_id;
      }
    }

    getAction() {
      if (this.isValidRequest()) {
        return this.jsonObject.command.action;
      }
    }

    isValidAction() {
      return (this.validActions.indexOf(this.jsonObject.command.action) != -1);
    }

    hasCallback() {
      if (this.isValidRequest()) {
        return this.jsonObject.has_callback;
      }
    }

    getValue() {
      if (this.isValidRequest()) {
        return this.jsonObject.command.value;
      }
    }
}
