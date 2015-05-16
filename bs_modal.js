// Generated by CoffeeScript 1.9.2

/*

BootStrapModal
    v1.0.0

Copyright (c) 2015 Y.Kaneko
    https://github.com/ky0314/BootstrapModal

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php

Requirement:
   Bootstrap 3.X and jQuery


USAGE:
just load the .js file
<script src="bs_modal.js"></script>

simple example :
   BootStrapModal.call({"title":"success", "body":"Data successfully updated"});
 

another example with full-options :
   BootStrapModal.call(
        {
            "title"  : "delete the data", // the title put at the header(String)
            "body"   : "Are you sure to delete the data? ", // the main message of the modal window(String or jQuery object)
            "fade"   : true, // if true, the modal window appears by fading(Boolean)
            "static" : true, // if true, the modal window WILL NOT BE DISAPPEARED when background is clicked or ESC is pressed.(Boolean)
            "id"     : "", //
            "actions" :[ // Array of objects to create buttons
                        {
                            "label": "Cancel",
                            "type": "default",
                            "class_str": "",
                            "close": true,
                            "callback": function(modal){
                                     // the function to be executed when the button is clicked
                                     // this function will receive the instance of modal class, which has "close()" method to close the modal.
                                     // when you set the "close:false", do not forget to call "modal.close()" at the last of the function
                            }
                        },
                        {
                            "label": "Delete",
                            "type": "danger",
                            "class_str": "",
                            "close": false,
                            "callback": function(modal){
                                    alert("delete!");
                                    modal.close();
                            }
                        }
                        ]
        }
    );
 */

(function() {
  var BootstrapModal;

  window.BootStrapModal = {};

  BootstrapModal = window.BootStrapModal;

  BootStrapModal.call = function(options_in) {
    return new BootStrapModal.modal_builder(options_in);
  };

  BootstrapModal.modal_builder = (function() {
    var build_footer, build_html, options;

    options = {
      "title": null,
      "body": null,
      "fade": true,
      "static": false,
      "id": null,
      "actions": [
        {
          "label": "OK",
          "type": "default",
          "class_str": "",
          "close": true,
          "callback": function(modal) {}
        }
      ]
    };

    function modal_builder(options_in) {
      this.options = $.extend(true, options, options_in);
      this.id = options.id != null ? options.id : "BootStrapModalInstance";
      this.$html = null;
      this.buttons = {};
      build_html.call(this);
      this.show();
    }

    modal_builder.prototype.show = function() {
      var ops;
      ops = {
        "show": true
      };
      if (this.options["static"] === true) {
        ops["backdrop"] = "static";
        ops["keyboard"] = false;
      }
      return this.$html.modal(ops);
    };

    modal_builder.prototype.close = function() {
      return this.$html.modal("hide");
    };

    build_html = function() {
      var $modal, $modal_body, $modal_content, $modal_header;
      $modal_content = $("<div/>").addClass("modal-content");
      $modal_header = $("<div/>").addClass("modal-header").append($("<button/>").addClass("close").attr({
        "type": "button",
        "data-dismiss": "modal",
        "aria-label": "close"
      }).append($("<span/>").attr({
        "aria-hidden": "true"
      }).html("&times;")));
      if (this.options["static"] === true) {
        $modal_header.find("button").remove();
      }
      if ((this.options.title != null) && typeof this.options.title === "string") {
        $modal_header.append($("<h4/>").text(this.options.title));
      }
      $modal_content.append($modal_header);
      $modal_body = $("<div/>").addClass("modal-body");
      if (this.options.body instanceof jQuery) {
        $modal_body.append(this.options.body);
      } else if (typeof this.options.body === "string") {
        $modal_body.text(this.options.body);
      }
      $modal_content.append($modal_body);
      $modal_content.append(build_footer.call(this));
      $modal = $("<modal/>").addClass("modal").append($("<div/>").addClass("modal-dialog").append($modal_content));
      if (this.options.fade === true) {
        $modal.addClass("fade");
      }
      return this.$html = $modal;
    };

    build_footer = function() {
      var $div, act, actions, btn, i, len;
      actions = options.actions;
      $div = $("<div/>").addClass("modal-footer");
      for (i = 0, len = actions.length; i < len; i++) {
        act = actions[i];
        if (!((act != null) && typeof act === "object")) {
          continue;
        }
        btn = new BootStrapModal.button(this, act);
        $div.append(btn.get_html());
        this.buttons[act.id] = btn;
      }
      return $div;
    };

    return modal_builder;

  })();

  BootstrapModal.button = (function() {
    var build_html;

    function button(modal_in, options_in) {
      this.modal = modal_in;
      this.id = options_in.id || "";
      this.label = options_in.label || "";
      this.type = options_in.type || "default";
      this.class_str = options_in.class_str || "";
      this.close = !(options_in.close === false);
      this.callback = options_in.callback || function() {};
      build_html.call(this);
    }

    button.prototype.get_html = function() {
      return this.$html;
    };

    build_html = function() {
      var $btn, self;
      $btn = $("<button/>").attr({
        "type": "button"
      }).addClass("btn");
      $btn.text(this.label);
      switch (this.type) {
        case "info":
          $btn.addClass("btn-info");
          break;
        case "success":
          $btn.addClass("btn-success");
          break;
        case "warning":
          $btn.addClass("btn-warning");
          break;
        case "danger":
          $btn.addClass("btn-danger");
          break;
        default:
          $btn.addClass("btn-default");
      }
      if ((this.class_str != null) && typeof this.class_str === "string") {
        $btn.addClass(this.class_str);
      }
      self = this;
      $btn.click(function() {
        if (typeof self.callback === "function") {
          self.callback(self.modal);
        }
        if (self.close === true) {
          return self.modal.close();
        }
      });
      return this.$html = $btn;
    };

    return button;

  })();

}).call(this);

//# sourceMappingURL=bs_modal.js.map
