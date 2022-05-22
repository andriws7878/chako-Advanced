sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        function onInit() {
            var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
            var oJSONModelCountries = new sap.ui.model.json.JSONModel();
            var oView = this.getView();
            var i18nBundle = oView.getModel("i18n").getResourceBundle();
            /*var oJSON = {
                employeeId: "12345",
                countryKey: "UK",
                listCountry: [
                    {
                        key: "US",
                        text: i18nBundle.getText("countryUS")
                    },
                    {
                        key: "UK",
                        text: i18nBundle.getText("countryUK")
                    },
                    {
                        key: "ES",
                        text: i18nBundle.getText("countryES")
                    }
                ]
            };
            oJSONModel.setData(oJSON);*/
            oJSONModelEmpl.loadData("./localService/mockdata/Employees.json", false);
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);
            /*oJSONModel.attachRequestCompleted(function(oEventModel){
                console.log(JSON.stringify(oJSONModel.getData()));
            });*/
            oView.setModel(oJSONModelEmpl, "jsonEmployees");
            oView.setModel(oJSONModelCountries, "jsonCoutries");

            var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                visibleID: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });
            oView.setModel(oJSONModelConfig, "jsonConfig");
        };

        function onFilter() {
            var oJSONCountires = this.getView().getModel("jsonCoutries").getData();

            var filters = [];

            if (oJSONCountires.EmployeeId !== "") {
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSONCountires.EmployeeId));
            }

            if (oJSONCountires.CountryKey !== "") {
                filters.push(new Filter("Country", FilterOperator.EQ, oJSONCountires.CountryKey));
            }

            var oList = this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters);
        };

        function onClearFilter() {
            var oModel = this.getView().getModel("jsonCoutries");
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");
        };

        function showPostalCode(oEvent) {
            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext("jsonEmployees");
            var objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);
        };

        function onShowCity(oEvent){
            var oJSONModelConfig = this.getView().getModel("jsonConfig");
            oJSONModelConfig.setProperty("/visibleCity", true);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", true);
        };

        function onHideCity(oEvent){
            var oJSONModelConfig = this.getView().getModel("jsonConfig");
            oJSONModelConfig.setProperty("/visibleCity", false);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", false);
        };

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

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.onShowCity = onShowCity;
        Main.prototype.onHideCity = onHideCity;
        return Main;
    });