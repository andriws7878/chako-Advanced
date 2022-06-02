sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],

    function (Controller, Filter, FilterOperator) {
        return Controller.extend("chakoapp.employees.controller.Main", {

            onInit: function () {
                var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
                var oJSONModelCountries = new sap.ui.model.json.JSONModel();
                var oJSONModelLayout = new sap.ui.model.json.JSONModel();
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
                oJSONModelLayout.loadData("./localService/mockdata/Layout.json", false);
                /*oJSONModel.attachRequestCompleted(function(oEventModel){
                    console.log(JSON.stringify(oJSONModel.getData()));
                });*/
                oView.setModel(oJSONModelEmpl, "jsonEmployees");
                oView.setModel(oJSONModelCountries, "jsonCoutries");
                oView.setModel(oJSONModelLayout, "jsonLayout");

                var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                    visibleID: true,
                    visibleName: true,
                    visibleCountry: true,
                    visibleCity: false,
                    visibleBtnShowCity: true,
                    visibleBtnHideCity: false
                });
                oView.setModel(oJSONModelConfig, "jsonConfig");

                this._bus = sap.ui.getCore().getEventBus();
                this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetails, this);
            },

            showEmployeeDetails: function(category, nameEvent, path) {
                var detailView = this.getView().byId("detailEmployeeView");
                detailView.bindElement("jsonEmployees>" + path)
                this.getView().getModel("jsonLayout").setProperty("/ActiveKey", "TwoColumnsMidExpanded");

                var incidenceModel = new sap.ui.model.json.JSONModel([]);
                detailView.setModel(incidenceModel, "incidenceModel");
                detailView.byId("tableIncidence").removeAllContent();
            }
        });
    });