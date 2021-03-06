/*
 * View model for OctoPrint-Simpleemergencystop
 *
 * Author: Sebastien Clement
 * License: AGPLv3
 */
$(function() {
    function RaisecloudViewModel(parameters) {
        var self = this;
        self.settings = undefined;
        self.allSettings = parameters[0];
        self.loginState = parameters[1];
        self.printerState = parameters[2];
        self.confirmation = undefined;

        self.onAfterBinding = function() {
            self.confirmation = $("#confirmation");
            self.settings = self.allSettings.settings.plugins.raisecloud;
        };

        self.click = function () {
            if(self.settings.confirmationDialog())
                self.confirmation.modal("show");
            else
                self.sendCommand()

        };

        self.sendCommand = function () {
            $.ajax({
                 //url: API_BASEURL+"plugin/simpleemergencystop",
                 url: "https://api.raise3d.com/api-v1.1/user/login",
                 type: "POST",
                 dataType: "json",
                 data: {},
                 contentType: "application/json; charset=UTF-8",
                 success: function (data,status) {
                       console.log(data);
                 }
            });
            self.confirmation.modal("hide");

        };

        self.visibleTest = function () {
            return  self.loginState.isUser() && self.printerState.isOperational()
        };


    }

    // view model class, parameters for constructor, container to bind to
    OCTOPRINT_VIEWMODELS.push([
        RaisecloudViewModel,

        ["settingsViewModel","loginStateViewModel","printerStateViewModel"],

        ["#navbar_plugin_raisecloud"]
    ]);
});
