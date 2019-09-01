'use babel';

export default class Request {

    validActions = [
      "set_full_config_dictionary",
      "set_config_dictionary_item",
      "send_message_to_editor"
    ];

    jsonObject = null;

    jsonString = null;

    constructor(str) {
      this.jsonString = str;
    }

    isJson() {
      try {
        this.jsonObject = JSON.parse(this.jsonString);
      } catch (e) {
        return false;
      };
      return true;
    };

    isForEditor() {
      if(this.jsonObject['receiver'] == 'editor') {
        return true;
      }
      return false;
    }

    isStructuredCorrectly() {
      let keys = Object.keys(this.jsonObject);
      if(keys.indexOf('command') != -1 &&
         keys.indexOf('sender') != -1  &&
         keys.indexOf('receiver') != -1) {
        let command = this.jsonObject['command'];
        let commandKeys = Object.keys(command);
        if(commandKeys.indexOf('action') != -1 &&
           commandKeys.indexOf('value')) {
          return true;
        }
      }
      return false;
    }

    isValidRequest() {
      if(this.isJson() &&
         this.isStructuredCorrectly() &&
         this.isForEditor() &&
         this.isValidAction()) {
        return true;
      }
      return false;
    }

    getEventId() {
      if (this.isValidRequest()) {
        return this.jsonObject['event_id'];;
      }
    }

    getAction() {
      if (this.isValidRequest()) {
        return this.jsonObject['command']['action'];
      }
    }

    isValidAction() {
      if (this.validActions.indexOf(this.jsonObject['command']['action']) != -1) {
        return true;
      }
      return false;
    }

    getValue() {
      if (this.isValidRequest()) {
        return this.jsonObject['command']['value'];
      }
    }
}
