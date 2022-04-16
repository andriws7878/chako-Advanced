sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        var Main = Controller.extend("andriws.Employees.controller.MainView", {});

            Main.prototype.onValidate = function () {
                var inputEmpleyee = this.byId("inputEmpleyee");
                var valueEmpleyee = inputEmpleyee.getValue();

                if (valueEmpleyee.length === 6) {
                    //inputEmpleyee.setDescription("OK");
                    this.getView().byId("labelCountry").setVisible(true);
                    this.getView().byId("slCountry").setVisible(true);
                } else {
                    //inputEmpleyee.setDescription("Not OK");
                    this.getView().byId("labelCountry").setVisible(false);
                    this.getView().byId("slCountry").setVisible(false);
                };
            };
        return Main;
    });